import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { swagConfig } from './utils/swagger_config.ts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  app.enableCors({ credentials: true });

  const document = SwaggerModule.createDocument(app, swagConfig);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      apiSorter: 'alpha',
      operationsSorter: 'alpha'
    },
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 5050;
  await app.listen(port);
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
}

bootstrap();
