import { DeepPartial, FindOptionsWhere } from "typeorm";
import { ProfileEntity } from "../entities/profile.entity";

export interface IProfileRepository {
    findOne(id: number): Promise<ProfileEntity>;
    findOneBy(data: FindOptionsWhere<ProfileEntity>): Promise<ProfileEntity>;

    create(data: DeepPartial<ProfileEntity>): Promise<ProfileEntity>;
    update(id: number, data: DeepPartial<ProfileEntity>): Promise<ProfileEntity>;
    delete(id: number): Promise<void>;
}