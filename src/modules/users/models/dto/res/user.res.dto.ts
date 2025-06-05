import { PickType } from '@nestjs/swagger';

import { UserBaseResDto } from './user-base.res.dto';

export class UserResDto extends PickType(UserBaseResDto, [
  'first_name',
  'last_name',
  'id',
  'email',
  'phone',
  'role',
  'avatar_image',
  'created',
  'updated',
]) {
}
