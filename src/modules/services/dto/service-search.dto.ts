import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsIn } from 'class-validator';

export class ServiceSearchDto {
  @ApiPropertyOptional({ description: 'Пошук за частиною назви послуги' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['name', 'id'], default: 'name' })
  @IsOptional()
  @IsIn(['name', 'id'])
  sortBy?: 'name' | 'id' = 'name';
}
