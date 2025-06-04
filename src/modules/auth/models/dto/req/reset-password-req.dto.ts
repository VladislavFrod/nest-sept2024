import { IsString, MinLength } from 'class-validator';

export class ResetPasswordReqDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}