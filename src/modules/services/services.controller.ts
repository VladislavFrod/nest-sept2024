import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceSearchDto } from './dto/service-search.dto';
import { ServicesService } from './services/services.service';



@ApiTags('6.Services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі доступні послуги' })
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Пошук послуг за частиною назви' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sortBy', enum: ['name', 'id'], required: false })
  search(@Query() query: ServiceSearchDto) {
    return this.servicesService.search(query.name, query.sortBy);
  }


  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити нову послугу (тільки для адміністраторів)' })
  @Post()
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async create(@Body() dto: CreateServiceDto) {
    return this.servicesService.create(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити послугу (тільки для адміністраторів)' })
  @Delete(':id')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  async delete(@Param('id') id: string) {
    await this.servicesService.remove(+id);
    return { message: 'Service deleted successfully' };
  }
}
