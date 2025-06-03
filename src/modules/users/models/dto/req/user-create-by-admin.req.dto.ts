import { PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserBaseReqDto } from './base-user.req.dto';

export class UserCreateByAdminReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'phone',
  'password',
]) {
  @IsString()
  @IsOptional()
  @IsEnum(AdminRoleEnum, {
    message: 'Role must be one of the following values:buyer,seller',
  })
  @Transform(TransformHelper.trim)
  public readonly role?: AdminRoleEnum;
}
