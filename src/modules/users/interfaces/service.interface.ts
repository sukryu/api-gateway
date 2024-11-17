import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthProvider } from 'src/auth/auth-provider.enum';

export interface IUserService {
  findOne(userId: number): Promise<UserEntity>;
  findOneByUsername(username: string): Promise<UserEntity>;
  findOneBySocialId(
    socialId: string,
    provider: AuthProvider,
  ): Promise<UserEntity>;
  findOneByPhoneNumber(phoneNumber: string): Promise<UserEntity>;

  getImageUrl(userId: number): Promise<string>;
  isUserActive(userId: number): Promise<boolean>;
  isUserVerified(userId: number): Promise<boolean>;

  create(createUserDto: CreateUserDto): Promise<UserEntity>;
  update(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
  delete(userId: number): Promise<void>;
}
