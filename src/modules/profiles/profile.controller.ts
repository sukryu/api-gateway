import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { PROFILE_SERVICE } from 'src/common/constants/profle.constants';
import { IProfileService } from './interfaces/service.interface';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(
        @Inject(PROFILE_SERVICE)
        private readonly profilesService: IProfileService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new profile' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The profile has been successfully created.',
        type: ProfileEntity,
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Profile already exists for this user.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileEntity> {
        return this.profilesService.create(createProfileDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get profile by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Profile retrieved successfully.',
        type: ProfileEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProfileEntity> {
        return this.profilesService.findOne(id);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get profile by user ID' })
    @ApiParam({ name: 'userId', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Profile retrieved successfully.',
        type: ProfileEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    async findByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<ProfileEntity> {
        return this.profilesService.findOneByUserId(userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update profile by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Profile updated successfully.',
        type: ProfileEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid update data.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateProfileDto: UpdateProfileDto,
    ): Promise<ProfileEntity> {
        return this.profilesService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete profile by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'Profile deleted successfully.',
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Profile not found.' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.profilesService.delete(id);
    }
}