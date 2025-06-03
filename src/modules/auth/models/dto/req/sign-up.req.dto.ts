import { PickType } from '@nestjs/swagger';

import { BaseUserAuthReqDto } from './base-auth.req.dto';

export class UserSingUpReqDto extends PickType(BaseUserAuthReqDto, [
  'email',
  'password',
  'phone',
  'first_name',
  'last_name',
]) {}
