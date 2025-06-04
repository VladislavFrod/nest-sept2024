import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  clinicIds?: number[];

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  serviceIds?: number[];
}