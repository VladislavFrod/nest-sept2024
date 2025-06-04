// src/modules/clinics/clinics.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClinicSearchDto } from './models/dto/clinic-search.dto';
import { CreateClinicDto } from './models/dto/create-clinic.dto';
import { ClinicsService } from './services/clinics.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

@ApiTags('5. Clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  async findAll() {
    return this.clinicsService.findAll();
  }

  // @Get('filter')
  // async filter(
  //   @Query('serviceIds') serviceIdsRaw?: string,
  //   @Query('doctorIds') doctorIdsRaw?: string,
  // ) {
  //   const serviceIds = serviceIdsRaw
  //     ? serviceIdsRaw.split(',').map(Number)
  //     : undefined;
  //   const doctorIds = doctorIdsRaw
  //     ? doctorIdsRaw.split(',').map(Number)
  //     : undefined;
  //
  //   return this.clinicsService.findByFilters(serviceIds, doctorIds);
  // }
  @Get('search')
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sortBy', enum: ['name', 'id'], required: false })
  search(@Query() query: ClinicSearchDto) {
    return this.clinicsService.search(query.name, query.sortBy);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() dto: CreateClinicDto) {
    return this.clinicsService.create(dto);
  }
}
