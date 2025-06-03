import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';



import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorsService } from './services/doctors.service';

@ApiTags('5.Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  async findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.createDoctor(dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async remove(@Param('id') id: string) {
    await this.doctorsService.remove(+id);
    return { message: 'Doctor deleted successfully' };
  }
}
