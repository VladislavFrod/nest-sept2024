import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { addMinutes } from 'date-fns';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { AdminConfigType, EnvConfigType } from '../../../configs/config.type';
import { PasswordResetToken } from '../../../database/entities/password-reset-token.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UserCreateByAdminReqDto } from '../../users/models/dto/req/user-create-by-admin.req.dto';
import { UsersService } from '../../users/services/users.service';
import { UserSingInReqDto } from '../models/dto/req/sign-in.req.dto';
import { UserSingUpReqDto } from '../models/dto/req/sign-up.req.dto';
import { TokenPairResDto } from '../models/dto/res/token-pair.res.dto';
import { IUserData } from '../models/interfaces/user-data.interface';
import { AuthAccessService } from './auth-cache-service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly refreshRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly authAccessService: AuthAccessService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly envConfig: ConfigService<EnvConfigType>,
    @InjectRepository(PasswordResetToken)
    private readonly resetTokenRepository: Repository<PasswordResetToken>,
  ) {
  }

  private async generateSaveTokens(
    user_id: string,
    device: string,
  ): Promise<TokenPairResDto> {
    const tokens = await this.tokenService.generateAuthTokens({
      user_id,
      device,
    });
    await Promise.all([
      this.refreshRepository.save({
        device,
        refresh: tokens.refresh,
        user_id,
      }),
      this.authAccessService.saveToken(tokens.access, user_id, device),
    ]);
    return tokens;
  }

  private async deleteTokens(user_id: string, device: string) {
    await Promise.all([
      this.refreshRepository.delete({
        device,
        user_id,
      }),
      this.authAccessService.deleteToken(user_id, device),
    ]);
  }

  public async singUp(
    dto: UserSingUpReqDto,
    request: Request,
  ): Promise<[UserEntity, TokenPairResDto]> {

    await this.userService.isEmailExistOrThrow(dto.email);
    const device = request.headers['user-agent'];
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
    const tokens = await this.generateSaveTokens(user.id, device);
    return [user, tokens];
  }

  public async singIn(
    dto: UserSingInReqDto,
    request: Request,
  ): Promise<[UserEntity, TokenPairResDto]> {

    const user = await this.userRepository.findOne({
      where: { email: dto.email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true,
        phone: true,
        role: true,
        avatar_image: true,
        created: true,
        updated: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }
    const device = request.headers['user-agent'];

    await this.deleteTokens(user.id, device);
    const tokens = await this.generateSaveTokens(user.id, device);
    return [user, tokens];
  }

  public async refresh({ user, device }: IUserData): Promise<TokenPairResDto> {
    await this.deleteTokens(user.id, device);
    return await this.generateSaveTokens(user.id, device);
  }

  public async signOut({ user, device }: IUserData) {
    await this.deleteTokens(user.id, device);
  }

  async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('Email is already taken');
    }
  }

  async generateResetToken(email: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Користувача не знайдено');

    const token = uuidv4();

    await this.resetTokenRepository.save({
      token,
      user,
    });

    return { token };
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const record = await this.resetTokenRepository.findOne({
      where: { token },
      relations: ['user'], // ← додано
    });

    if (!record) throw new BadRequestException('Недійсний токен');

    const expiredAt = addMinutes(record.createdAt, 1500);
    const now = new Date();

    if (expiredAt.getTime() < now.getTime()) {
      throw new BadRequestException('Токен прострочено');
    }

    const user = record.user; // ← тепер не буде undefined

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);

    await this.resetTokenRepository.delete({ id: record.id });
  }

  public async adminCreate(): Promise<void> {
    const dto = plainToInstance(
      UserCreateByAdminReqDto,
      this.envConfig.get<AdminConfigType>('admin'),
    );
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new NotAcceptableException([
        'Administrator data is not valid as mentioned below:',
        ...errors.map((error) => Object.values(error.constraints)).flat(),
      ]);
    }
    try {
      if (
        !(await this.userRepository.findOneBy({
          email: dto.email,
        }))
      ) {
        // Admin account create
        await this.userRepository.save(
          this.userRepository.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10),
          }),
        );
        Logger.log('Administrator account created');
      } else {
        Logger.log('Administrator account exist');
      }
    } catch (err) {
      Logger.log('Administrator account creation error', err);
    }
  }
}
