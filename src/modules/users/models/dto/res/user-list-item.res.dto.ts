import { ApiProperty } from '@nestjs/swagger';

import { AdminRoleEnum } from '../../enums/user-role.enum';

export class UserListItemResDto {
  @ApiProperty({ format: 'uuid' })
  public readonly id: string;

  @ApiProperty({
    description: 'Users first name',
  })
  public readonly first_name?: string;

  @ApiProperty({
    description: 'Users last name',
    example: 'Doe',
  })
  public readonly last_name?: string;

  @ApiProperty({ example: 'customer@gmail.com' })
  public readonly email: string;

  @ApiProperty({ example: 'Csfe4354D$' })
  public readonly password?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+30888888888',
  })
  public readonly phone: string;

  public readonly role: AdminRoleEnum;

  public readonly avatar_image?: string;

  public readonly created: Date;

  public readonly updated: Date;
}
