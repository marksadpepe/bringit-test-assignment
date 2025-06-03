import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from 'src/excpetion/all-exceptions-filter';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000, () => {
    Logger.log('Listening for requests on port 3000', 'NestApplication');
  });
}

bootstrap();
