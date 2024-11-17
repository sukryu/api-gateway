import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
        return this.authService.login(loginDto);
    }

    @Post('refresh')
    async refresh(@Body() body: { refreshToken: string }): Promise<TokenDto> {
    const decoded = await this.authService.validateToken(body.refreshToken);
    if (decoded.type !== 'refresh') {
        throw new UnauthorizedException('Invalid refresh token');
    }

    const isValid = await this.authService.validateRefreshToken(
        decoded.sub,
        body.refreshToken,
    );

    if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
    }

    return this.authService.login({ username: decoded.username, password: '' });
    }
}