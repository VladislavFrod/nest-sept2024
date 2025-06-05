import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ClinicEntity } from '../../../database/entities/clinic.entity';
import { DoctorEntity } from '../../../database/entities/doctor.entity';
import { ServiceEntity } from '../../../database/entities/service.entity';
import { CreateClinicDto } from '../models/dto/create-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private readonly clinicRepo: Repository<ClinicEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepo: Repository<DoctorEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
  ) {
  }

  async create(dto: CreateClinicDto): Promise<ClinicEntity> {
    const clinic = this.clinicRepo.create({ name: dto.name });

    if (dto.doctorIds?.length) {
      const doctors = await this.doctorRepo.find({
        where: { id: In(dto.doctorIds) },
        relations: ['services'],
      });
      clinic.doctors = doctors;
    }
    return this.clinicRepo.save(clinic);
  }

  async search(name?: string, sortBy: 'name' | 'id' = 'name'): Promise<ClinicEntity[]> {
    const queryBuilder = this.clinicRepo
      .createQueryBuilder('clinic')
      .leftJoinAndSelect('clinic.doctors', 'doctor')
      .leftJoinAndSelect('doctor.services', 'service');
    if (name) {
      queryBuilder.where('LOWER(clinic.name) LIKE LOWER(:name)', { name: `%${name}%` });
    }
    queryBuilder.orderBy(`clinic.${sortBy}`, 'ASC');
    return await queryBuilder.getMany();
  }

  async findAll(): Promise<ClinicEntity[]> {
    return this.clinicRepo.find({
      relations: ['doctors', 'doctors.services'],
    });
  }
}
