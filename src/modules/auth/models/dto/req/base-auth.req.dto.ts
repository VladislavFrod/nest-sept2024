import { PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from '../../../../users/models/dto/req/base-user.req.dto';

export class BaseUserAuthReqDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'password',
  'phone',
]) {}
