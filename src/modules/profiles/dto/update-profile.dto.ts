import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";
import { Gender } from "../gender.enum";

export class UpdateProfileDto {
    @ApiPropertyOptional({ example: '1', type: Number })
    @IsNumber()
    @IsOptional()
    userId: number | null;

    @ApiPropertyOptional({ example: 'kr', type: String })
    @IsString()
    @IsOptional()
    location: string | null;

    @ApiPropertyOptional({ example: 'https://example.com', type: String })
    @IsUrl()
    @IsOptional()
    website: string | null;

    @ApiPropertyOptional({ example: 'male', enum: Gender })
    @IsEnum(Gender)
    @IsOptional()
    gender: string | null;

    @ApiPropertyOptional({ example: 'korean', type: String })
    @IsString()
    @IsOptional()
    language: string | null;
}