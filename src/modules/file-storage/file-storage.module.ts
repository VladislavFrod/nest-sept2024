import { Module } from '@nestjs/common';

import { AwsStorageService } from './services/file-storage.service';

@Module({
  controllers: [],
  providers: [AwsStorageService],
  exports: [AwsStorageService],
})
export class AwsStorageModule {}
