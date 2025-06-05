import { Body, Controller, forwardRef, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetStoredUserDataFromResponse } from '../../common/decorators/get-stored-user-data-from-response.decorator';
import { UserPresenterService } from '../users/services/user-presenter.service';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ForgotPasswordReqDto } from './models/dto/req/forgot-password-req.dto';
import { ResetPasswordReqDto } from './models/dto/req/reset-password-req.dto';
import { UserSingInReqDto } from './models/dto/req/sign-in.req.dto';
import { UserSingUpReqDto } from './models/dto/req/sign-up.req.dto';
import { AuthResDto } from './models/dto/res/auth.res.dto';
import { TokenPairResDto } from './models/dto/res/token-pair.res.dto';
import { IUserData } from './models/interfaces/user-data.interface';
import { AuthService } from './services/auth.service';


@ApiTags('1.Authorization')
@Controller('auth')
export class AuthController {
  @Inject(forwardRef(() => UserPresenterService))
  private readonly userPresenter: UserPresenterService;

  constructor(
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserPresenterService))
      userPresenter: UserPresenterService,
  ) {
    this.userPresenter = userPresenter;
  }

  @Post('sing-up')
  @ApiOperation({ summary: 'Реєстрація користувача' })
  // ToDo
  public async singUp(
    @Body() dto: UserSingUpReqDto,
    @Req() request: Request,
  ): Promise<any> {
    return await this.authService.singUp(dto, request);
  }

  @Post('sing-in')
  @ApiOperation({ summary: 'Вхід' })
  public async singIn(
    @Body() dto: UserSingInReqDto,
    @Req() request: Request,
  ): Promise<AuthResDto> {
    const [user, tokens] = await this.authService.singIn(dto, request);
    return { tokens, user: this.userPresenter.toResponseDto(user) };
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Отримати токен для скидання паролю' })
  async forgotPassword(@Body() dto: ForgotPasswordReqDto): Promise<{ token: string }> {
    return this.authService.generateResetToken(dto.email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Скинути пароль за токеном' })
  async resetPassword(@Body() dto: ResetPasswordReqDto): Promise<{ message: string }> {
    await this.authService.resetPassword(dto.token, dto.newPassword);
    return { message: 'Пароль успішно змінено' };
  }

  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @Post('refresh')
  public async refresh(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<TokenPairResDto> {
    return await this.authService.refresh(userData);
  }

  @UseGuards(JwtAccessGuard)
  @ApiBearerAuth()
  @Post('sign-out')
  @ApiOperation({ summary: 'Вийти з аккаунту' })
  async signOut(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.authService.signOut(userData);
  }
}
