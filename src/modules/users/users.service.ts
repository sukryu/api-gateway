import {
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { IUserService } from './interfaces/service.interface';
  import { USER_REPOSITORY } from 'src/common/constants/user.constants';
  import { IUserRepository } from './interfaces/repository.interface';
  import { UserEntity } from './entities/user.entity';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { AuthProvider } from 'src/auth/auth-provider.enum';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
  
@Injectable()
export class UsersService implements IUserService {
    private readonly logger = new Logger(UsersService.name);
  
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository,
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}
  
    async findOne(userId: number): Promise<UserEntity> {
        try {
            const user = await this.repo.findOne(userId);
            if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
            }
            return user;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async findOneByUsername(username: string): Promise<UserEntity> {
        try {
            const user = await this.repo.findOneBy({ username });
            if (!user) {
            this.logger.error(`User with username '${username}' not found.`);
            throw new NotFoundException(`User with username '${username}' not found.`);
            }
            return user;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async findOneBySocialId(
      socialId: string,
      provider: AuthProvider,
    ): Promise<UserEntity> {
        try {
            const user = await this.repo.findOneBy({ socialId, provider });
            if (!user) {
            this.logger.error(
                `User with socialId '${socialId}' and provider '${provider}' not found.`,
            );
            throw new NotFoundException(
                `User with socialId '${socialId}' and provider '${provider}' not found.`,
            );
            }
            return user;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async findOneByPhoneNumber(phoneNumber: string): Promise<UserEntity> {
        try {
            const user = await this.repo.findOneBy({ phoneNumber });
            if (!user) {
            this.logger.error(`User with phone number '${phoneNumber}' not found.`);
            throw new NotFoundException(
                `User with phone number '${phoneNumber}' not found.`,
            );
            }
            return user;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async getImageUrl(userId: number): Promise<string> {
        try {
            const user = await this.repo.findOne(userId);
            if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
            }
            return user.profileImageUrl;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async isUserActive(userId: number): Promise<boolean> {
        try {
            const user = await this.repo.findOne(userId);
            if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
            }
            return user.isActive;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }

    async isUserVerified(userId: number): Promise<boolean> {
        try {
            const user = await this.repo.findOne(userId);
            if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
            }
            return user.isVerified;
        } catch (e) {
            this.logger.error(`Unexpected error occurred: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Unexpected error occurred.`);
        }
    }
  
    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // 유니크 필드 중복 검사
            const { email, username, phoneNumber } = createUserDto;

            const existingUser = await this.repo.findOneBy({
                email,
            });

            if (existingUser) {
                this.logger.error(`Email '${email}' already exists.`);
                throw new ConflictException(`Email '${email}' already exists.`);
            }

            const existingUsername = await this.repo.findOneBy({ username });
            if (existingUsername) {
                this.logger.error(`Username '${username}' already exists.`);
                throw new ConflictException(`Username '${username}' already exists.`);
            }

            const existingPhoneNumber = await this.repo.findOneBy({ phoneNumber });
            if (existingPhoneNumber) {
                this.logger.error(`Phone number '${phoneNumber}' already exists.`);
                throw new ConflictException(`Phone number '${phoneNumber}' already exists.`);
            }

            // 사용자 생성
            const user = await this.repo.create(createUserDto);

            await queryRunner.commitTransaction();
            return user;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            if (e instanceof ConflictException) {
                throw e;
            }
            this.logger.error(`Error creating user: ${e.message}`, e.stack);
            throw new InternalServerErrorException(`Error creating user.`);
        } finally {
            await queryRunner.release();
        }
    }

    async update(
        userId: number,
        updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        const user = await this.repo.findOne(userId);
        if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }

        // 유니크 필드 중복 검사
        const { email, username, phoneNumber } = updateUserDto;

        if (email && email !== user.email) {
            const existingUser = await this.repo.findOneBy({ email });
            if (existingUser) {
            this.logger.error(`Email '${email}' already exists.`);
            throw new ConflictException(`Email '${email}' already exists.`);
            }
        }

        if (username && username !== user.username) {
            const existingUsername = await this.repo.findOneBy({ username });
            if (existingUsername) {
            this.logger.error(`Username '${username}' already exists.`);
            throw new ConflictException(`Username '${username}' already exists.`);
            }
        }

        if (phoneNumber && phoneNumber !== user.phoneNumber) {
            const existingPhoneNumber = await this.repo.findOneBy({ phoneNumber });
            if (existingPhoneNumber) {
            this.logger.error(`Phone number '${phoneNumber}' already exists.`);
            throw new ConflictException(`Phone number '${phoneNumber}' already exists.`);
            }
        }

        // 사용자 정보 업데이트
        const updatedUser = await this.repo.update(userId, updateUserDto);

        await queryRunner.commitTransaction();
        return updatedUser;
        } catch (e) {
        await queryRunner.rollbackTransaction();
        if (e instanceof NotFoundException || e instanceof ConflictException) {
            throw e;
        }
        this.logger.error(`Error updating user: ${e.message}`, e.stack);
        throw new InternalServerErrorException(`Error updating user.`);
        } finally {
        await queryRunner.release();
        }
    }

    async delete(userId: number): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
        const user = await this.repo.findOne(userId);
        if (!user) {
            this.logger.error(`User with ID ${userId} not found.`);
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }

        // 사용자 삭제
        await this.repo.delete(userId);

        await queryRunner.commitTransaction();
        } catch (e) {
        await queryRunner.rollbackTransaction();
        if (e instanceof NotFoundException) {
            throw e;
        }
        this.logger.error(`Error deleting user: ${e.message}`, e.stack);
        throw new InternalServerErrorException(`Error deleting user.`);
        } finally {
        await queryRunner.release();
        }
    }
}
  