import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetToken } from '../../database/entities/password-reset-token.entity';
import { DoctorsService } from '../doctors/services/doctors.service';

import { RedisModule } from '../redis/redis.module';
import { RepositoryModule } from '../repository/repository.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthAccessService } from './services/auth-cache-service';
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
    // {
    //   /*To implement authorization guard to all endpoints globally*/
    //   provide: APP_GUARD,
    //   useClass: JwtAccessGuard,
    // },
  ],
  exports: [AuthAccessService, AuthService, TokenService],
})
export class AuthModule {}
