import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';


import { ApiFile } from '../../common/decorators/api-file.decorator';
import { FileLimitation } from '../../common/decorators/file-limitation.decorator';
import { GetStoredUserDataFromResponse } from '../../common/decorators/get-stored-user-data-from-response.decorator';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { GetUsersQueryReqDto } from './models/dto/req/get-users-query.req.dto';
import { UserSelfUpdateReqDto } from './models/dto/req/user-self-update.req.dto';
import { UserResDto } from './models/dto/res/user.res.dto';
import { UsersService } from './services/users.service';

@ApiTags('3.User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    example: {
      statusCode: 401,
      messages: 'Unauthorized',
      timestamp: new Date().toUTCString(),
      path: '/user/me',
    },
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard)
  @Get('me')
  public async findMe(
    @GetStoredUserDataFromResponse() UserData: IUserData,
  ): Promise<UserResDto> {
    console.log('Users retrieved:', UserData);
    return await this.usersService.findMe(UserData);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Patch('me')
  public async updateMe(
    @GetStoredUserDataFromResponse() userData: IUserData,
    @Body() dto: UserSelfUpdateReqDto,
  ): Promise<UserResDto> {
    return await this.usersService.updateUser(dto, userData.user.id);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorised' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNoContentResponse({ description: 'User successfully removed' })
  @UseGuards(JwtAccessGuard)
  @Delete('me')
  public async removeMe(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.usersService.removeMe(userData);
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Avatar saved successfully' })
  @ApiPayloadTooLargeResponse({
    description: 'Filesize is more than 0.3MB',
    example: {
      statusCode: 413,
      messages: 'File too large',
      timestamp: '2024-10-09T17:21:35.763Z',
      path: '/user/me/avatar',
    },
  })
  @ApiBearerAuth()
  @FileLimitation('avatar', 1024 * 300)
  @ApiConsumes('multipart/form-data')
  @ApiFile('avatar', false, false, '0.3MB')
  @Post('me/avatar')
  public async uploadAvatar(
    @UploadedFile() avatar: Express.Multer.File,
    @GetStoredUserDataFromResponse()
    userData: IUserData,
  ): Promise<void> {
    await this.usersService.uploadAvatar(userData, avatar);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({ description: 'Avatar deleted successful' })
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete('me/avatar')
  public async deleteAvatar(
    @GetStoredUserDataFromResponse() userData: IUserData,
  ): Promise<void> {
    await this.usersService.deleteAvatar(userData);
  }

  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @UseGuards(JwtAccessGuard, AdminRoleGuard) // Доступ лише для адмінів
  @Get()
  public async getAllUsers(
    @GetStoredUserDataFromResponse() userData: IUserData,
    @Query() query: GetUsersQueryReqDto,
  ): Promise<{ users: UserResDto[]; total: number }> {
    const [users, total] = await this.usersService.getUsers(userData, query);

    return {
      users: plainToInstance(UserResDto, users, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Видалення користувача (тільки для адміністраторів)',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @UseGuards(JwtAccessGuard, AdminRoleGuard) // Тільки для адміністраторів
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }
}
