import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryGlobalFilter } from '@sentry/nestjs/setup';

import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { ClinicsModule } from './modules/clinics/clinic.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { EnvConnectionModule } from './modules/env-connection/env-connection.module';
import { PostgresModule } from './modules/postgres/postgres.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { ServicesModule } from './modules/services/services.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PostgresModule,
    UsersModule,
    AuthModule,
    RedisModule,
    RepositoryModule,
    AuthModule,
    EnvConnectionModule,
    UploadModule,
    ClinicsModule,
    DoctorsModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {
  constructor() {
    console.log('AppModule initialized');
  }
}
