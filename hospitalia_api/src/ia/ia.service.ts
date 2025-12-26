import { Injectable } from '@nestjs/common';

@Injectable()
export class IaService {
  // Simula conexão com GPT-4/Gemini offline
  async checkIA(): Promise<boolean> {
    try {
      // Aqui você chamaria a IA real, ex:
      // const response = await gpt4.generate({ prompt: 'Teste' });
      // return response ? true : false;

      // Para teste offline:
      return true;
    } catch (error) {
      console.error('Erro ao verificar a IA:', error);
      return false;
    }
  }
}
