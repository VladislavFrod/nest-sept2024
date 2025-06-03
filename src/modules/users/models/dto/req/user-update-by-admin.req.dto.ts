import { PartialType, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserBaseReqDto } from './base-user.req.dto';

export class UserUpdateByAdminReqDto extends PartialType(
  PickType(UserBaseReqDto, ['first_name', 'last_name', 'phone']),
) {
  @IsString()
  @IsOptional()
  @IsEnum(AdminRoleEnum)
  @Transform(TransformHelper.trim)
  public readonly role?: AdminRoleEnum;
}
