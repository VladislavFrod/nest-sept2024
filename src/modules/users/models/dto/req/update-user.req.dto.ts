import { PartialType, PickType } from '@nestjs/swagger';

import { UserBaseReqDto } from './base-user.req.dto';

export class UserUpdateReqDto extends PartialType(
  PickType(UserBaseReqDto, ['first_name', 'last_name', 'phone']),
) {}
