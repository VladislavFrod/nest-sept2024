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
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServicesService } from './services/services.service';



@ApiTags('6.Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async delete(@Param('id') id: string) {
    await this.servicesService.remove(+id);
    return { message: 'Service deleted successfully' };
  }
}
