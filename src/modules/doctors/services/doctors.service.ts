import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicEntity } from '../../../database/entities/clinic.entity';
import { DoctorEntity } from '../../../database/entities/doctor.entity';
import { ServiceEntity } from '../../../database/entities/service.entity';
import { UserEntity } from '../../../database/entities/user.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';



@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepo: Repository<DoctorEntity>,

    @InjectRepository(ClinicEntity)
    private clinicRepo: Repository<ClinicEntity>,

    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,

    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createDoctor(dto: CreateDoctorDto): Promise<DoctorEntity> {
    const { clinicIds, serviceIds, ...doctorData } = dto;



    const clinics = await this.clinicRepo.findByIds(clinicIds);
    if (!clinics.length) throw new NotFoundException('Clinics not found');

    const services = await this.serviceRepo.findByIds(serviceIds);
    if (!services.length) throw new NotFoundException('Services not found');

    const doctor = this.doctorRepo.create({
      ...doctorData,
      clinics,
      services,
    });

    return this.doctorRepo.save(doctor);
  }

  async findAll(): Promise<DoctorEntity[]> {
    return this.doctorRepo.find({ relations: ['clinics', 'services', 'user'] });
  }

  async findOne(id: number): Promise<DoctorEntity> {
    const doctor = await this.doctorRepo.findOne({
      where: { id },
      relations: ['clinics', 'services', 'user'],
    });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepo.remove(doctor);
  }
}
