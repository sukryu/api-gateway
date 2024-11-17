import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "./repository/user.repository.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { USER_SERVICE } from "src/common/constants/user.constants";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
    imports: [
        UserRepositoryModule,
        TypeOrmModule.forFeature([]),
    ],
    controllers: [UsersController],
    providers: [
        {
            provide: USER_SERVICE,
            useClass: UsersService,
        },
    ],
    exports: [USER_SERVICE],
})
export class UsersModule {};