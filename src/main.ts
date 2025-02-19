import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfigurálása
  const config = new DocumentBuilder()
    .setTitle('Autókölcsönző API')
    .setDescription('Autókölcsönző weboldal és mobil applikáció API dokumentáció')
    .setVersion('1.0')
    .addTag('cars')
    .addTag('users')
    .addTag('bookings')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
