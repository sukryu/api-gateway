import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { AuthProvider } from "src/auth/auth-provider.enum";

export class CreateUserDto {
    @ApiProperty({ example: 'test123@example.com', type: String })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiPropertyOptional({ example: 'Test123!!@', type: String })
    @IsString()
    @IsOptional()
    password: string | null;

    @ApiPropertyOptional({ example: 'john Doe', type: String })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiPropertyOptional({ example: 'UUID', type: String })
    @IsString()
    @IsOptional()
    socialId: string | null;

    @ApiProperty({ example: 'Email', enum: AuthProvider })
    @IsEnum(AuthProvider)
    provider: AuthProvider;

    @ApiProperty({ example: '01012345678', type: String })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiPropertyOptional({ example: 'Self introduction', type: String })
    @IsString()
    @IsOptional()
    bio: string | null;
}