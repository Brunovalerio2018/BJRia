import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
;

import morgan from 'morgan';
import { swagConfig } from './utils/swagger_config.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de logs HTTP
  app.use(morgan('dev'));

  // Middleware CORS - liberar apenas localhost
  app.enableCors({
    origin: ['http://localhost:3000'], // pode ajustar se necessário
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  // Configuração do Swagger
  const document = SwaggerModule.createDocument(app, swagConfig);
  SwaggerModule.setup('api', app, document);
  const port = 5050;
  await app.listen(port);
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
}

bootstrap();
