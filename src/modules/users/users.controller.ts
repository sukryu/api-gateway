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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { USER_SERVICE } from 'src/common/constants/user.constants';
import { IUserService } from './interfaces/service.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(
        @Inject(USER_SERVICE)
        private readonly usersService: IUserService,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The user has been successfully created.',
        type: UserEntity,
    })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'User already exists.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User retrieved successfully.',
        type: UserEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity> {
        return this.usersService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User updated successfully.',
        type: UserEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict in updating user.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'User deleted successfully.',
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.usersService.delete(id);
    }

    @Get('username/:username')
    @ApiOperation({ summary: 'Get user by username' })
    @ApiParam({ name: 'username', type: String })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User retrieved successfully.',
        type: UserEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async findByUsername(@Param('username') username: string): Promise<UserEntity> {
        return this.usersService.findOneByUsername(username);
    }

    @Get('phone/:phoneNumber')
    @ApiOperation({ summary: 'Get user by phone number' })
    @ApiParam({ name: 'phoneNumber', type: String })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User retrieved successfully.',
        type: UserEntity,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async findByPhoneNumber(@Param('phoneNumber') phoneNumber: string): Promise<UserEntity> {
        return this.usersService.findOneByPhoneNumber(phoneNumber);
    }

    @Get(':id/active')
    @ApiOperation({ summary: 'Check if user is active' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User activity status retrieved successfully.',
        type: Boolean,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async isUserActive(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.usersService.isUserActive(id);
    }

    @Get(':id/verified')
    @ApiOperation({ summary: 'Check if user is verified' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'User verification status retrieved successfully.',
        type: Boolean,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async isUserVerified(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
        return this.usersService.isUserVerified(id);
    }

    @Get(':id/profile-image')
    @ApiOperation({ summary: 'Get user profile image URL' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Profile image URL retrieved successfully.',
        type: String,
    })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    async getProfileImageUrl(@Param('id', ParseIntPipe) id: number): Promise<string> {
        return this.usersService.getImageUrl(id);
    }
}
