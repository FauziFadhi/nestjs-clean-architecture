import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from '@utils/all-exception-filter';
import { ValidationPipe } from '@utils/pipe/ValidationPipe';
import { install } from 'source-map-support';
import { DashboardModule } from 'adapter/rest/dashboard/dashbord.module';

import { AppModule } from './app.module';

async function bootstrap() {
  install();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Apps')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [DashboardModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api/dashboard/docs', app, document);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: false,
  });
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');
  await app.listen(appPort || 3000);
}
bootstrap();
