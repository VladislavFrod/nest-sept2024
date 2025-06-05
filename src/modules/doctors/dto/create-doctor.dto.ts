import { PickType } from '@nestjs/swagger';
import { IsArray, IsInt } from 'class-validator';
import { UserBaseReqDto } from '../../users/models/dto/req/base-user.req.dto';

export class CreateDoctorDto extends PickType(UserBaseReqDto, [
  'first_name',
  'last_name',
  'email',
  'phone',
]) {

  @IsArray()
  @IsInt({ each: true })
  clinicIds: number[];

  @IsArray()
  @IsInt({ each: true })
  serviceIds: number[];
}
