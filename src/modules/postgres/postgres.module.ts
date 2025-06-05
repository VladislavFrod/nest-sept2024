import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { EnvConfigType, PostgresConfigType } from '../../configs/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (envConfig: ConfigService<EnvConfigType>) => {
        const {
          user: username,
          password,
          host,
          port,
          dbName: database,
        } = envConfig.get<PostgresConfigType>('postgres');
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'entities',
              '*.entity.js',
            ),
          ],
          migrationsRun:
            true,
          migrations: [
            path.join(
              process.cwd(),
              'dist',
              'src',
              'database',
              'migrations',
              '*.js',
            ),
          ],
          synchronize:
            false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class PostgresModule {
}
