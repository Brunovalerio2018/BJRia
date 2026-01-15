import { Controller, Get, Query } from '@nestjs/common';
import { GeminiService } from '../gemini.config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Gemini IA')
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('ask')
  async ask(@Query('prompt') prompt: string) {
    const resposta = await this.geminiService.ask(prompt);
    return { resposta };
  }
}
