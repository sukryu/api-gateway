import { BadRequestException, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { IProfileService } from "./interfaces/service.interface";
import { PROFILE_REPOSITORY } from "src/common/constants/profle.constants";
import { IProfileRepository } from "./interfaces/repository.interface";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ProfileEntity } from "./entities/profile.entity";
import { USER_SERVICE } from "src/common/constants/user.constants";
import { IUserService } from "../users/interfaces/service.interface";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService implements IProfileService {
  private readonly logger = new Logger(ProfileService.name);

  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly repo: IProfileRepository,
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findOne(id: number): Promise<ProfileEntity> {
    try {
      const profile = await this.repo.findOne(id);
      
      if (!profile) {
        this.logger.error(`Profile with ID: ${id} not found.`);
        throw new NotFoundException(`Profile with ID: ${id} not found.`);
      }

      if (!profile.userId) {
        this.logger.error(`Profile ${id} has no associated user.`);
        throw new NotFoundException(`Profile ${id} has invalid data: no associated user found.`);
      }

      return profile;
    } catch (e) {
      this.logger.error(`Error finding profile ${id}: ${e.message}`, e.stack);
      throw new InternalServerErrorException(`Unexpected error occurred.`);
    }
  }

  async findOneByUserId(userId: number): Promise<ProfileEntity> {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) {
        this.logger.error(`user not found.`);
        throw new NotFoundException(`User not found.`);
      }

      const profile = await this.repo.findOneBy({ userId: user });
      if (!profile) {
        this.logger.error(`Profile with UserId: ${userId} not found.`);
        throw new NotFoundException(`Profile with userId: ${userId} not found.`);
      }

      return profile;
    } catch (e) {
      this.logger.error(`Error finding profile with userId ${userId}: ${e.message}`, e.stack);
      throw new InternalServerErrorException(`Unexpected error occurred.`);
    }
  }

  async create(createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.userService.findOne(createProfileDto.userId);
      if (!user) {
        this.logger.error(`User ID with ${createProfileDto.userId} not found.`);
        throw new NotFoundException(`user ID with ${createProfileDto.userId} not found.`);
      }

      // Check if profile already exists for the user
      const existingProfile = await this.repo.findOneBy({ userId: user });
      if (existingProfile) {
        this.logger.error(`Profile already exists for user ${createProfileDto.userId}`);
        throw new BadRequestException(`Profile already exists for this user`);
      }

      const profile = await queryRunner.manager.save(ProfileEntity, {
        userId: user,
        location: createProfileDto.location,
        website: createProfileDto.website,
        gender: createProfileDto.gender,
        language: createProfileDto.language,
      });

      await queryRunner.commitTransaction();
      return profile;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error creating profile: ${e.message}`, e.stack);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const profile = await this.findOne(id);

      if (updateProfileDto.userId) {
        const user = await this.userService.findOne(updateProfileDto.userId);
        if (!user) {
          this.logger.error(`User ID with ${updateProfileDto.userId} not found.`);
          throw new NotFoundException(`user ID with ${updateProfileDto.userId} not found.`);
        }
        profile.userId = user;
      }

      // Update other fields if provided
      if (updateProfileDto.location !== undefined) profile.location = updateProfileDto.location;
      if (updateProfileDto.website !== undefined) profile.website = updateProfileDto.website;
      if (updateProfileDto.gender !== undefined) profile.gender = updateProfileDto.gender;
      if (updateProfileDto.language !== undefined) profile.language = updateProfileDto.language;

      const updatedProfile = await queryRunner.manager.save(ProfileEntity, profile);
      await queryRunner.commitTransaction();
      
      return updatedProfile;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error updating profile ${id}: ${e.message}`, e.stack);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const profile = await this.findOne(id);
      
      await queryRunner.manager.remove(ProfileEntity, profile);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Error deleting profile ${id}: ${e.message}`, e.stack);
      throw e;
    } finally {
      await queryRunner.release();
    }
  }
}