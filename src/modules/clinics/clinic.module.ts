import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../database/entities/clinic.entity';
import { DoctorEntity } from '../../database/entities/doctor.entity';
import { ServiceEntity } from '../../database/entities/service.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { ClinicsController } from './clinic.controller';
import { ClinicsService } from './services/clinics.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicEntity, UserEntity,  DoctorEntity, ServiceEntity]), AuthModule, DoctorsModule],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService],
})
export class ClinicsModule {}
