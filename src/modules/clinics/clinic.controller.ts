import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ClinicSearchDto } from './models/dto/clinic-search.dto';
import { CreateClinicDto } from './models/dto/create-clinic.dto';
import { ClinicsService } from './services/clinics.service';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

@ApiTags('4. Clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати список всіх клінік' })
  async findAll() {
    return this.clinicsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Пошук клінік по назві' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sortBy', enum: ['name', 'id'], required: false })
  search(@Query() query: ClinicSearchDto) {
    return this.clinicsService.search(query.name, query.sortBy);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити нову клініку(тільки для адміністраторів)' })
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() dto: CreateClinicDto) {
    return this.clinicsService.create(dto);
  }
}
