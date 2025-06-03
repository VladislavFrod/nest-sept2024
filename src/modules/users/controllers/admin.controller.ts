import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AdminRoleGuard } from '../../auth/guards/admin-role.guard';
import { JwtAccessGuard } from '../../auth/guards/jwt-access.guard';
import { UserCreateByAdminReqDto } from '../models/dto/req/user-create-by-admin.req.dto';
import { UserUpdateByAdminReqDto } from '../models/dto/req/user-update-by-admin.req.dto';
import { UserResDto } from '../models/dto/res/user.res.dto';
import { UserPresenterService } from '../services/user-presenter.service';
import { UsersService } from '../services/users.service';

@ApiTags('2.Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userPresenter: UserPresenterService,
  ) {}

  @ApiBearerAuth()
  @Post('user')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async createUser(
    @Body() dto: UserCreateByAdminReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.createUser(dto),
    );
  }

  @ApiBearerAuth()
  @Patch(':user_id/user')
  @UseGuards(JwtAccessGuard, AdminRoleGuard)
  public async updateUser(
    @Param('user_id', ParseUUIDPipe) user_id: string,
    @Body() dto: UserUpdateByAdminReqDto,
  ): Promise<UserResDto> {
    return this.userPresenter.toResponseDto(
      await this.usersService.updateUser(dto, user_id),
    );
  }
}
