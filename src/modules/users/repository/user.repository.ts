import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../interfaces/repository.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
    ) {}

    async create(data: DeepPartial<UserEntity>): Promise<UserEntity> {
        return this.repo.save(
            this.repo.create(data),
        );
    }

    async update(userId: number, data: DeepPartial<UserEntity>): Promise<UserEntity> {
        await this.repo.update(userId, data);
        return this.repo.findOne({ where: { id: userId } });
    }

    async delete(userId: number): Promise<void> {
        await this.repo.delete(userId);
    }

    findOne(userId: number): Promise<UserEntity> {
        return this.repo.findOne({ where: { id: userId } });
    }

    findOneBy(data: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
        return this.repo.findOneBy(data);
    }
}