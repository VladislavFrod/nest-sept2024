import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CreateClinicDto } from './models/dto/create-clinic.dto';
import { ClinicsService } from './services/clinics.service';

@ApiTags('4.Clinic')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {
  }

  @Get()
  async findAll() {
    return await this.clinicsService.findAll();
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() createClinicDto: CreateClinicDto) {
    return await this.clinicsService.create(createClinicDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async deleteClinics(@Param('id') id: string) {
    await this.clinicsService.remove(id);
    return { message: 'Category deleted successfully' };
  }
}
