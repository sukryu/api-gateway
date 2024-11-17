import { Injectable, Inject, UnauthorizedException  } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject('USER_SERVICE') private readonly userClient: ClientKafka,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }

    // User 서비스에 사용자 검증 요청
    try {
      const user = await firstValueFrom(
        this.userClient.send('validate_user', { userId: payload.sub })
      );

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        ...payload,
        ...user.permissions,  // User 서비스에서 받은 권한 정보
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to validate user');
    }
  }

  onModuleInit() {
    this.userClient.subscribeToResponseOf('validate_user');
  }
}