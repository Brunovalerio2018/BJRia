import { DocumentBuilder } from '@nestjs/swagger';

export const swagConfig = new DocumentBuilder()
  .setTitle('BJRia - HospitalIA / Triagem API')
  .setDescription(
    'API oficial do sistema HospitalIA da BJRia. Gerencia pacientes, triagem, consultas, exames e interações da inteligência artificial, disponibilizando dados de forma segura e eficiente para aplicações WEB e Mobile.'
  )
  .setVersion('1.0')
  .setContact(
    'BJRia Tech',
    'localhost:5050/api',   // Api padrão local momentaneo
    'suporte@bjria.com',  // email de contato
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
    'access-token',
  )
  .build();
