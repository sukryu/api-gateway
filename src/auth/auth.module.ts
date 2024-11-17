import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    ClientsModule.register([
        {
            name: 'USER_SERVICE',
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'user',
                    brokers: ['localhost:9092'],
                },
                consumer: {
                    groupId: 'user-consumer',
                },
            },
        },
    ]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}