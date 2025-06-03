import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRepository } from '../../repository/services/user.repository';
import { TokenTypeEnum } from '../models/enums/token-type.enum';
import { AuthAccessService } from '../services/auth-cache-service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
    private readonly authAccessService: AuthAccessService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const skipAuth = this.reflector.getAllAndOverride<boolean>('SKIP_AUTH', [
    //   context.getHandler(),
    //   context.getClass(),
    // ]);
    // if (skipAuth) return true;

    const request = context.switchToHttp().getRequest();
    const access = request.get('Authorization')?.split(' ').pop();

    if (!access) {
      throw new UnauthorizedException();
    }

    const { user_id, device } = await this.tokenService.verifyToken(
      access,
      TokenTypeEnum.ACCESS,
    );
    if (!user_id) {
      throw new UnauthorizedException();
    }

    const accessTokenExist = await this.authAccessService.isAccessTokenExist(
      user_id,
      device,
      access,
    );
    if (!accessTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    request.user_data = {
      user,
      device,
    };
    return true;
  }
}
