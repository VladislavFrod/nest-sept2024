import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { join } from 'path';
import { getMetadataArgsStorage } from 'typeorm';

import { AppModule } from './app.module';
import { AppConfigType } from './configs/config.type';
import { AuthService } from './modules/auth/services/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('Nest application started');

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  const envConfigService = app.get(ConfigService);
  const appEnvConfig = envConfigService.get<AppConfigType>('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Медична платформа')
    .setDescription('API для клінік, лікарів і послуг')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'headers',
    })
    .build();

  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, SwaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      docExpansion: 'list',
      defaultModelExpandDepth: 1,
      persistAuthorization: true,
    },
  });
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true,
  });
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  console.log(getMetadataArgsStorage().tables.map((table) => table.name));
  await app.listen(appEnvConfig.port, async () => {
    await app.get(AuthService).adminCreate();
    Logger.log(
      `Server started on: http://${appEnvConfig.host}:${appEnvConfig.port}`,
    );
    Logger.log(
      `Swagger is available on: http://${appEnvConfig.host}:${appEnvConfig.port}/api-docs`,
    );
  });
}

void bootstrap();