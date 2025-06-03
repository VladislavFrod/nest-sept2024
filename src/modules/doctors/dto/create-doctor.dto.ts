import { IsArray, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  phoneNumber: string;

  @IsArray()
  @IsNumber({}, { each: true })
  clinicIds: number[];

  @IsArray()
  @IsNumber({}, { each: true })
  serviceIds: number[];
}
