import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

import { TransformHelper } from '../../../../../common/helpers/transform.helper';
import { regexp } from '../../../constants/regexp';
import { AdminRoleEnum } from '../../enums/user-role.enum';

export class UserBaseReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[а-яА-ЯїЇєЄіІa-zA-Z]+$/, {
    message: 'First name must only contain letters (Ukrainian or Latin)',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Users first name',
    example: 'Іван',
  })
  public readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Matches(/^[а-яА-ЯїЇєЄіІa-zA-Z]+$/, {
    message: 'Last name must only contain letters (Ukrainian or Latin)',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Users last name',
    example: 'Петренко',
  })
  public readonly last_name: string;

  @IsString()
  @Matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: 'Must be a valid e-mail address',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ example: 'customer@gmail.com' })
  public readonly email: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Length(6, 16)
  @ApiProperty({ example: 'simplePassword' })
  public readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  @Transform(TransformHelper.trim)
  @Matches(regexp.phone, {
    message: 'Please enter valid phone number',
  })
  @ApiProperty({
    description: 'User phone number',
    example: '+381234567000',
  })
  public readonly phone: string;

  @IsString()
  @IsEnum(AdminRoleEnum, {
    message: 'Role must be one of the following values: user, manager, admin',
  })
  @Transform(TransformHelper.trim)
  @ApiProperty({ enum: AdminRoleEnum, default: AdminRoleEnum.USER })
  public readonly role: AdminRoleEnum;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'User avatar',
    required: false,
    example: 'path to image',
  })
  public readonly avatar_image?: string;
}
