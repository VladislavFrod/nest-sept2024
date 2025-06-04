import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards, Query,
} from '@nestjs/common';

import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorSearchDto } from './dto/doctor-search.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorsService } from './services/doctors.service';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'query', required: false })
  @ApiQuery({ name: 'sortBy', enum: ['first_name', 'last_name'], required: false })
  search(@Query() query: DoctorSearchDto) {
    return this.doctorsService.search(query.query, query.sortBy);
  }


  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.doctorsService.findOne(+id);
  // }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Post()
  create(@Body() dto: CreateDoctorDto) {
    return this.doctorsService.create(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
