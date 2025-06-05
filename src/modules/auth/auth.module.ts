import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from '../../database/entities/password-reset-token.entity';

import { RedisModule } from '../redis/redis.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthAccessService } from './services/auth-cache-service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    RepositoryModule,
    JwtModule,
    RedisModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([PasswordResetToken]),//Token
  ],
  controllers: [AuthController],
  providers: [
    AuthAccessService,
    AuthService,
    TokenService,
  ],
  exports: [AuthAccessService, AuthService, TokenService],
})
export class AuthModule {}
