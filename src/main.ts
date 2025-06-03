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

  // add environment configuration to project using @nestjs/config
  const envConfigService = app.get(ConfigService);
  const appEnvConfig = envConfigService.get<AppConfigType>('app');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Frod create marketplace')
    .setDescription('Marketplace API')
    .setVersion('1.0')
    .addBearerAuth({
      /* Authentication */
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'headers',
    })
    .build();

  // Creation of Swagger document
  const SwaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, SwaggerDocument, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      // operationsSorter: 'method',
      // type of lists representation
      docExpansion: 'list',
      // Expansion depth
      defaultModelExpandDepth: 1,
      // authorization credentials (like an access token, JWT, or session token)
      // will be stored and reused across multiple requests or sessions.
      persistAuthorization: true,
    },
  });
  app.enableCors({
    origin: 'http://localhost:3001', // Дозволяє запити з фронтенду на порті 3001
    methods: 'GET,POST,PUT,DELETE', // Дозволяє ці методи
    allowedHeaders: 'Authorization, Content-Type', // Додаємо заголовок Authorization
    credentials: true, // Дозволяє відправляти cookies, якщо вони є
  });
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Pipes
  app.useGlobalPipes(
    // Validation of DTO
    new ValidationPipe({
      // if DTO without decorators whole DTO won't be allowed
      whitelist: true,
      // In DTO only properties with decorators are allowed
      forbidNonWhitelisted: true,
      //   Allow transformation of Validated DTO properties (class transform used!!!!)
      transform: true,
    }),
  );
  console.log(getMetadataArgsStorage().tables.map((table) => table.name));
  // Start-up of server
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