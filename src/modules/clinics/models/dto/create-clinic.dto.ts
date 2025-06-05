import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  doctorIds?: number[];
}
