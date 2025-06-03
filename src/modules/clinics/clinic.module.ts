import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicEntity } from '../../database/entities/clinic.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ClinicsController } from './clinic.controller';
import { ClinicsService } from './services/clinics.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClinicEntity, UserEntity]), AuthModule],
  controllers: [ClinicsController],
  providers: [ClinicsService],
  exports: [ClinicsService],
})
export class ClinicsModule {}
