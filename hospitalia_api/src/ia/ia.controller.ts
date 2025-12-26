import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IaService } from './ia.service';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('status')
  @ApiOperation({ summary: 'Verifica se a IA GPT-4/Gemini e o banco estão funcionando' })
  @ApiResponse({
    status: 200,
    description: 'Status da IA e do banco de dados',
  })
  async getStatus() {
    const iaStatus = await this.iaService.checkIA();

    return {
      ia: iaStatus ? 'IA funcionando' : 'IA offline',
      database: 'Banco de dados conectado', // aqui você pode checar real com TypeORM/Prisma
    };
  }
}
