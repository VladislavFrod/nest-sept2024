import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './base-user.req.dto';

export class UserSelfCreateReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'password',
  'phone',
]) {}
