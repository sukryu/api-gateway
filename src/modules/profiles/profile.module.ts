import { Module } from "@nestjs/common";
import { ProfileRepositoryModule } from "./repository/profile.repository.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfilesController } from "./profile.controller";
import { PROFILE_SERVICE } from "src/common/constants/profle.constants";
import { ProfileService } from "./profile.service";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    ProfileRepositoryModule,
    TypeOrmModule.forFeature([]),
    UsersModule,
  ],
  controllers: [ProfilesController],
  providers: [
    {
      provide: PROFILE_SERVICE,
      useClass: ProfileService,
    },
  ],
  exports: [PROFILE_SERVICE],
})
export class ProfileModule {};