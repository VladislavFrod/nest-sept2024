import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoctorEntity } from '../../database/entities/doctor.entity';
import { ClinicEntity } from '../../database/entities/clinic.entity';
import { ServiceEntity } from '../../database/entities/service.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';


import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './services/doctors.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DoctorEntity,
      ClinicEntity,
      ServiceEntity,
      UserEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [DoctorsService],
  controllers: [DoctorsController],
  exports: [DoctorsService],
})
export class DoctorsModule {}
