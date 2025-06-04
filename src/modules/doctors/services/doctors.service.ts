import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ClinicEntity } from '../../../database/entities/clinic.entity';
import { DoctorEntity } from '../../../database/entities/doctor.entity';
import { ServiceEntity } from '../../../database/entities/service.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,

    @InjectRepository(ClinicEntity)
    private clinicRepo: Repository<ClinicEntity>,

    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
  ) {}

  async create(dto: CreateDoctorDto): Promise<DoctorEntity> {
    const clinics = await this.clinicRepo.findBy({ id: In(dto.clinicIds) });
    if (clinics.length !== dto.clinicIds.length) {
      throw new NotFoundException('One or more clinics not found');
    }

    const services = await this.serviceRepo.findBy({ id: In(dto.serviceIds) });
    if (services.length !== dto.serviceIds.length)
      throw new NotFoundException('One or more services not found');

    const doctor = this.doctorRepo.create({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      phone: dto.phone,
      clinics,
      services,
    });

    return this.doctorRepo.save(doctor);
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepo.find({ relations: ['clinics', 'services'] });
  }

  async findOne(id: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['clinics', 'services'],
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async search(query?: string, sortBy?: 'first_name' | 'last_name'): Promise<DoctorEntity[]> {
    const queryBuilder = this.doctorRepo
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.services', 'service');

    if (query) {
      queryBuilder.where(`
      LOWER(doctor.firstName) LIKE LOWER(:query)
      OR LOWER(doctor.lastName) LIKE LOWER(:query)
      OR LOWER(doctor.email) LIKE LOWER(:query)
      OR LOWER(doctor.phone) LIKE LOWER(:query)
    `, { query: `%${query}%` });
    }

    queryBuilder.orderBy(`doctor.${sortBy}`, 'ASC');

    return await queryBuilder.getMany();
  }


  async update(id: number, dto: UpdateDoctorDto): Promise<DoctorEntity> {
    const doctor = await this.findOne(id);

    if (dto.firstName) doctor.first_name = dto.firstName;
    if (dto.lastName) doctor.last_name = dto.lastName;

    if (dto.clinicIds) {
      const clinics = await this.clinicRepo.findBy({ id: In(dto.clinicIds) });
      if (clinics.length !== dto.clinicIds.length)
        throw new NotFoundException('One or more clinics not found');
      doctor.clinics = clinics;
    }

    if (dto.serviceIds) {
      const services = await this.serviceRepo.findBy({ id: In(dto.serviceIds) });
      if (services.length !== dto.serviceIds.length)
        throw new NotFoundException('One or more services not found');
      doctor.services = services;
    }

    return this.doctorRepo.save(doctor);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepo.remove(doctor);
  }
}
