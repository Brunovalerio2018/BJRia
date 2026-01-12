import { DocumentBuilder } from "@nestjs/swagger";

export const swagConfig = new DocumentBuilder()
  .setTitle("BJRia - HospitalIA / Triagem API ")
  .setDescription(
    ""
  )
  .setVersion("1.0")
  .addBearerAuth(
    { 
      type: 'http', 
      scheme: 'bearer', 
      bearerFormat: 'JWT' 
    },
    'access-token', // Aqui é o nome do esquema de autenticação
  )
  .build();
