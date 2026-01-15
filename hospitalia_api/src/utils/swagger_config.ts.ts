import { DocumentBuilder } from '@nestjs/swagger';

export const swagConfig = new DocumentBuilder()
  .setTitle('BJRia - HospitalIA / Triagem API ')
  .setDescription(
    'API oficial do sistema HospitalIA da BJRia. Gerencia pacientes, triagem, consultas, exames e interações da inteligência artificial.\n\n' +
      'Esta API permite o gerenciamento completo de um sistema hospitalar, incluindo funcionalidades avançadas de triagem e suporte por IA para otimizar o atendimento ao paciente.',
  )
  .setVersion('1.0')
  .setContact('BJRia Tech', 'http://localhost:5050/api', 'suporte@bjria.com')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
