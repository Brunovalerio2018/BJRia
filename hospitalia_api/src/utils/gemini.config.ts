import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  // Para testes offline, vamos simular respostas
  async ask(prompt: string): Promise<string> {
    // Aqui você poderia chamar um modelo local, mas por agora é mock
    return `Resposta simulada para: "${prompt}"`;
  }
}
