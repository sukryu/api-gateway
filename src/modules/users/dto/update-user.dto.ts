import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { AuthProvider } from "src/auth/auth-provider.enum";

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: 'test123@example.com', type: String })
    @IsEmail()
    @IsOptional()
    email: string | null;

    @ApiPropertyOptional({ example: 'UUID', type: String })
    @IsString()
    @IsOptional()
    socialId: string | null;

    @ApiPropertyOptional({ example: 'Email', enum: AuthProvider })
    @IsEnum(AuthProvider)
    @IsOptional()
    provider: AuthProvider;

    @ApiPropertyOptional({ example: 'john Doe', type: String })
    @IsString()
    @IsOptional()
    username: string | null;

    @ApiPropertyOptional({ example: '01012345678', type: String })
    @IsString()
    @IsOptional()
    phoneNumber: string | null;

    @ApiPropertyOptional({ example: 'Self introduction', type: String })
    @IsString()
    @IsOptional()
    bio: string | null;

    @ApiPropertyOptional({ example: 'https://example.com/api/v1/photos/url...', type: String })
    @IsUrl()
    @IsOptional()
    profileImageUrl: string;

    @ApiPropertyOptional({ example: 'true', type: Boolean })
    @IsNumber()
    @IsOptional()
    isActive: boolean | null;

    @ApiPropertyOptional({ example: 'true', type: Boolean })
    @IsNumber()
    @IsOptional()
    isVerified: boolean | null;
}