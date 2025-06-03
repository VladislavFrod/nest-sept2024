import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig, EnvConfigType } from '../../../configs/config.type';
import { UserEntity } from '../../../database/entities/user.entity';
import { GetUsersQueryReqDto } from '../models/dto/req/get-users-query.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserListResDto } from '../models/dto/res/user-list.res.dto';
import { UserListItemResDto } from '../models/dto/res/user-list-item.res.dto';

@Injectable()
export class UserPresenterService {
  constructor(private readonly configService: ConfigService<EnvConfigType>) {}

  public toUserListDto(
    usersList: UserEntity[],
    { page, limit, role, search, user_id }: GetUsersQueryReqDto,
    total: number,
  ): UserListResDto {
    return {
      data: usersList.map((user) => this.toResponseListItemDto(user)),
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
      role,
      search,
      user_id,
    };
  }

  public toResponseListItemDto(user: UserEntity): UserListItemResDto {
    const awsConfig = this.configService.get<AwsConfig>('aws');
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      // verify: user.verify,
      avatar_image: user.avatar_image
        ? `${awsConfig.bucketURL}/${user.avatar_image}`
        : null,
      created: user.created,
      updated: user.updated,
    };
  }

  public toResponseDto(user: UserEntity): UserResDto {
    const awsConfig = this.configService.get<AwsConfig>('aws');
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      // verify: user.verify,
      avatar_image: user.avatar_image
        ? `${awsConfig.bucketURL}/${user.avatar_image}`
        : null,
      created: user.created,
      updated: user.updated,
    };
  }
}
