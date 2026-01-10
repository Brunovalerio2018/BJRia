import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import { swagConfig } from './utils/swagger_config.ts';
import { OperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de logs HTTP
  app.use(morgan('dev'));


  // Configuração do Swagger
  const document = SwaggerModule.createDocument(app, swagConfig);
  SwaggerModule.setup('api', app, document);



  SwaggerModule.setup('api', app, document), {
    swaggerOptions: {
      persistAuthorization: true, // Mantém a autorização após atualização da página
      docExpansion: 'none', // Minimiza todas as seções por padrão
      apiSorter: 'alpha', // Ordena os endpoints alfabeticamente
      operationsSorter: 'alpha', // Ordena as operações alfabeticamente
    },  

  }
    app.enableCors({
    credentials: true, // Permite envio de cookies e cabeçalhos de autenticação
  });

    const port = 5050;
    await app.listen(port);
  console.log(`🚀 API rodando em http://localhost:${port}/api`);
}

bootstrap();
