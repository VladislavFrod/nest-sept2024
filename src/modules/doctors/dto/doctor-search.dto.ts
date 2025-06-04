import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class DoctorSearchDto {
  @ApiPropertyOptional({ description: 'Пошук по імені, прізвищу, email, телефону' })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiPropertyOptional({ enum: ['first_name', 'last_name'], default: 'first_name' })
  @IsOptional()
  @IsIn(['first_name', 'last_name'])
  sortBy?: 'first_name' | 'last_name' = 'first_name';
}
