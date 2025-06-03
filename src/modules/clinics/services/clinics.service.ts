import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClinicEntity } from '../../../database/entities/clinic.entity';
import { CreateClinicDto } from '../models/dto/create-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>,
  ) {}

  // Отримати всі клініки з лікарями
  async findAll() {
    return await this.clinicRepository.find({ relations: ['doctors'] });
  }

  // Створити клініку
  async create(createClinicDto: CreateClinicDto) {
    const { name } = createClinicDto;

    const clinic = this.clinicRepository.create({ name });
    return await this.clinicRepository.save(clinic);
  }

  // Видалити клініку
  async remove(id: string): Promise<void> {
    await this.clinicRepository.delete(id);
  }
}
