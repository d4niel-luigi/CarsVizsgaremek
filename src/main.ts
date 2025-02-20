import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfiguráció
  const config = new DocumentBuilder()
    .setTitle('Autós Bérlés API')
    .setDescription('Autós bérlés alkalmazás API dokumentációja')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); 

  app.useGlobalPipes(new ValidationPipe()); 

  await app.listen(3000);
}
bootstrap();
