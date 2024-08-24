import { DiscoveryModule, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
 app.enableCors({
    origin: [
      'https://*.vercel.app',
      'http://localhost:3000',
      'https://avenue39.vercel.app',
      'https://avenue39-git-dev-interior-films-projects.vercel.app',
      "https://avenue39-73ck3f2xg-interior-films-projects.vercel.app",
      'https://avenue39-git-faad-dev-interior-films-projects.vercel.app',
      "https://avenue39-git-mujtaba-dev-interior-films-projects.vercel.app"
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Avenue39')
    .setDescription('The Avenue39 API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3300);
}
bootstrap();
