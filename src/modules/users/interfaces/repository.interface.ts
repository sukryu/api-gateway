import { DeepPartial, FindOptionsWhere } from "typeorm";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository {
    create(data: DeepPartial<UserEntity>): Promise<UserEntity>;
    update(userId: number, data: DeepPartial<UserEntity>): Promise<UserEntity>;
    delete(userId: number): Promise<void>;

    findOne(userId: number): Promise<UserEntity>;
    findOneBy(data: FindOptionsWhere<UserEntity>): Promise<UserEntity>;
}