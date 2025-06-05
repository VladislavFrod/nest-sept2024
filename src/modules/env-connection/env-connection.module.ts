import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import environmentConfiguration from '../../configs/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        environmentConfiguration,
      ],
      isGlobal:
        true,
    }),
  ],
  exports: [ConfigModule],
})
export class EnvConnectionModule {
}
