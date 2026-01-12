import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../db/data-source';

@Injectable()
export class IaService {
  // Verifica se IA está funcionando (simulação)
  checkIA(): boolean {
    // Aqui você colocaria a verificação real da Gemini
    return true; // 🟢 online
  }

  // Verifica se o banco de dados está conectado
  checkDatabase(): boolean {
    return AppDataSource.isInitialized; // true se banco inicializado
  }
}
