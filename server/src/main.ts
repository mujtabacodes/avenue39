import { DiscoveryModule, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);

 
  const corsOptions: CorsOptions = {
    origin: [
      'http://localhost:3000',
      'https://avenue39.vercel.app', 
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  

    preflightContinue: false,
    };

    
    const app = await NestFactory.create(AppModule, { cors: corsOptions });

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

  await app.listen(process.env.port || 3300);
}
bootstrap();
