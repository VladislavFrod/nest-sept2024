import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { AuthService } from '../../auth/services/auth.service';
import { AuthAccessService } from '../../auth/services/auth-cache-service';
import { FileContentTypeEnum } from '../../file-storage/enums/content-type.enum';
import { AwsStorageService } from '../../file-storage/services/file-storage.service';
import { UserRepository } from '../../repository/services/user.repository';
import { GetUsersQueryReqDto } from '../models/dto/req/get-users-query.req.dto';
import { UserSelfCreateReqDto } from '../models/dto/req/user-self-create.req.dto';
import { UserUpdateByAdminReqDto } from '../models/dto/req/user-update-by-admin.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserPresenterService } from './user-presenter.service';

@Injectable()
export class UsersService {
  constructor(
    public readonly userRepository: UserRepository,
    public readonly authAccessService: AuthAccessService,
    @Inject(forwardRef(() => AuthService))
    private readonly awsStorageService: AwsStorageService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  public async getUsers(
    userData: IUserData,
    query: GetUsersQueryReqDto,
  ): Promise<[UserEntity[], number]> {
    return await this.userRepository.getUsers(userData, query);
  }

  public async updateUser(
    dto: UserUpdateByAdminReqDto,
    user_id: string,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: user_id });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  public async findMe({ user }: IUserData): Promise<UserResDto> {
    const userFound = await this.userRepository.findOneBy({
      id: user.id,
    });
    return this.userPresenter.toResponseDto(userFound);
  }

  public async createUser(dto: UserSelfCreateReqDto): Promise<UserEntity> {
    await this.isEmailExistOrThrow(dto.email);
    const password = await bcrypt.hash(dto.password, 10);
    return await this.userRepository.save(
      this.userRepository.create({ ...dto, password }),
    );
  }

  public async removeMe({ device, user }: IUserData): Promise<void> {
    const images = [user.avatar_image];
    for (const image of images) {
      await this.awsStorageService.deleteFile(image);
    }
    await this.userRepository.delete({ id: user.id });
    // not needed because in entity onDelete:'CASCADE' option used
    // await this.authService.signOut(userData);
    await this.authAccessService.deleteToken(user.id, device);
  }

  public async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('User already exists');
    }
  }

  public async uploadAvatar(
    { user }: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const avatarPath = await this.awsStorageService.uploadFile(
      avatar,
      FileContentTypeEnum.AVATAR,
      user.id,
    );
    await this.userRepository.update(user.id, { avatar_image: avatarPath });
  }

  public async deleteAvatar({ user }: IUserData): Promise<void> {
    const filePath = (await this.userRepository.findOneBy({ id: user.id }))
      .avatar_image;
    await this.awsStorageService.deleteFile(filePath);
    await this.userRepository.update(user.id, { avatar_image: null });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.userRepository.delete(id);
  }
}
