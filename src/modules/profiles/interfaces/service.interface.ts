import { CreateProfileDto } from "../dto/create-profile.dto";
import { UpdateProfileDto } from "../dto/update-profile.dto";
import { ProfileEntity } from "../entities/profile.entity";

export interface IProfileService {
  findOne(id: number): Promise<ProfileEntity>;
  findOneByUserId(userId: number): Promise<ProfileEntity>;

  create(createProfileDto: CreateProfileDto): Promise<ProfileEntity>;
  update(id: number, updateProfileDto: UpdateProfileDto): Promise<ProfileEntity>;
  delete(id: number): Promise<void>;
}