import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProfileEntity } from "../entities/profile.entity";
import { PROFILE_REPOSITORY } from "src/common/constants/profle.constants";
import { ProfileRepository } from "./profile.repository";

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [
    {
      provide: PROFILE_REPOSITORY,
      useClass: ProfileRepository,
    },
  ],
  exports: [PROFILE_REPOSITORY],
})
export class ProfileRepositoryModule {}