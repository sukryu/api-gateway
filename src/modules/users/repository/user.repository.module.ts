import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { USER_REPOSITORY } from "src/common/constants/user.constants";
import { UserRepository } from "./user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository,
        },
    ],
    exports: [USER_REPOSITORY],
})
export class UserRepositoryModule {};