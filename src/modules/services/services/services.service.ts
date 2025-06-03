import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../../../database/entities/service.entity';
import { CreateServiceDto } from '../dto/create-service.dto';


@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepo: Repository<ServiceEntity>,
  ) {}

  async create(dto: CreateServiceDto): Promise<ServiceEntity> {
    const service = this.serviceRepo.create(dto);
    return this.serviceRepo.save(service);
  }

  async findAll(): Promise<ServiceEntity[]> {
    return this.serviceRepo.find();
  }

  async findOne(id: number): Promise<ServiceEntity> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepo.remove(service);
  }
}
