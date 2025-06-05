import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { TokenTypeEnum } from '../models/enums/token-type.enum';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
  ) {
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refresh = request.get('Authorization')?.split(' ').pop();

    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { user_id, device } = await this.tokenService.verifyToken(
      refresh,
      TokenTypeEnum.REFRESH,
    );
    if (!user_id) {
      throw new UnauthorizedException();
    }

    const refreshTokenExist =
      await this.refreshTokenRepository.isRefreshTokenExist(refresh);
    if (!refreshTokenExist) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneBy({
      id: user_id,
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
