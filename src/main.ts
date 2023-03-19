import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const PORT = Number(process.env.APP_PORT) || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Photonique')
    .setDescription('The photonique API description')
    .setVersion('1.0')
    .addTag('Photonique')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const isInDevelopmentMode = process.env.NODE_ENV === 'development';
  if (isInDevelopmentMode) app.enableCors();

  await app.listen(PORT);
}
bootstrap();
