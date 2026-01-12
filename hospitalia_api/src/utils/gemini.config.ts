import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  async ping(): Promise<boolean> {
    try {
      // aqui você pode fazer uma requisição mínima ao Gemini
      await this.ask('Teste de ping');
      return true;
    } catch {
      return false;
    }
  }

  async ask(prompt: string): Promise<string> {
    // lógica de comunicação com Gemini
    return 'Resposta simulada';
  }
}
