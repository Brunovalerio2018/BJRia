import { Injectable } from '@nestjs/common';

@Injectable()
export class IaService {
  // Aqui você faria a conexão com o Gemini offline
 checkIA(): boolean {
    // Retorna true se a IA estiver "online"
    return true; // substitua pela verificação real da Gemini
  }

  // Aqui você checa se o banco de dados está conectado
  checkDatabase(): boolean {
    // Simula verificação de banco
    // Se estiver usando TypeORM, você pode fazer algo como:
    // return this.dataSource.isInitialized;
    return true;
  }
}