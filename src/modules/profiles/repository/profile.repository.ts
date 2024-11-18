import { Injectable } from "@nestjs/common";
import { IProfileRepository } from "../interfaces/repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfileEntity } from "../entities/profile.entity";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly repo: Repository<ProfileEntity>,
  ) {}

  async create(data: DeepPartial<ProfileEntity>): Promise<ProfileEntity> {
    return this.repo.save(
      this.repo.create(data),
    );
  }

  async update(id: number, data: DeepPartial<ProfileEntity>): Promise<ProfileEntity> {
    await this.repo.update(id, data);
    return this.repo.findOne({ where: { id }});
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  findOne(id: number): Promise<ProfileEntity> {
    return this.repo.findOne({ where: { id }, relations: ['userId']});
  }

  findOneBy(data: FindOptionsWhere<ProfileEntity>): Promise<ProfileEntity> {
    return this.repo.findOne({
      where: data,
      relations: ['userId'],
    });
  }
}