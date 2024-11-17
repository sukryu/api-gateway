import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  private readonly redis: Redis;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.redis = new Redis({
        host: configService.get('redis.host'),
        port: configService.get('redis.port'),
        password: configService.get('redis.password'),
    });
  }

  async login(loginDto: LoginDto): Promise<TokenDto> {
    // TODO: 실제 사용자 인증 로직 구현 필요
    const payload: JwtPayload = {
      sub: 'userId', // 실제 사용자 ID로 대체 필요
      username: loginDto.username,
      type: 'access',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken({ ...payload, type: 'refresh' }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.redis.set(
      `refresh_token:${userId}`,
      refreshToken,
      'EX',
      7 * 24 * 60 * 60, // 7일
    );
  }

  async validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
    const storedToken = await this.redis.get(`refresh_token:${userId}`);
    return storedToken === refreshToken;
  }
}