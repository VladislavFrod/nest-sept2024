import { PickType } from '@nestjs/swagger';

import { BaseUserAuthReqDto } from './base-auth.req.dto';

export class UserSingInReqDto extends PickType(BaseUserAuthReqDto, [
  'email',
  'password',
]) {}
