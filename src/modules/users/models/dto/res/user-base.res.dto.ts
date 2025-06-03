import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { AdminRoleEnum } from '../../enums/user-role.enum';
import { UserResDto } from './user.res.dto';

export class UserBaseResDto {
  @Expose()
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;
  @Expose()
  @ApiProperty({
    description: 'Users first name',
  })
  public readonly first_name?: string;
  @Expose()
  @ApiProperty({
    description: 'Users last name',
    example: 'Doe',
  })
  public readonly last_name?: string;
  @Expose()
  @ApiProperty({ example: 'customer@gmail.com' })
  public readonly email: string;
  @Expose()
  @ApiProperty({ example: 'Csfe4354D$' })
  public readonly password?: string;
  @Expose()
  @ApiProperty({
    example: '+30888888888',
  })
  public readonly phone: string;

  public readonly role: AdminRoleEnum;

  // public readonly verify: boolean;

  public readonly avatar_image?: string;

  public readonly created: Date;

  public readonly updated: Date;

  constructor(partial: Partial<UserResDto>) {
    Object.assign(this, partial);
  }
}
