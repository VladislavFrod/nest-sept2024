import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AwsStorageModule } from '../file-storage/file-storage.module';
import { RepositoryModule } from '../repository/repository.module';
import { AdminController } from './controllers/admin.controller';
import { UserPresenterService } from './services/user-presenter.service';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    AwsStorageModule,
    RepositoryModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UsersController, AdminController],
  providers: [UsersService, UserPresenterService],
  exports: [UsersService, UserPresenterService],
})
export class UsersModule {}
