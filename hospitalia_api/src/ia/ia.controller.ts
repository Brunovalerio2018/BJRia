import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IaService } from './ia.service';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('status')
  @ApiOperation({ summary: 'Verifica se a IA e o banco estão funcionando' })
  @ApiResponse({
    status: 200,
    description: 'IA funcionando e banco de dados conectado',
    schema: {
      example: {
        ia: '🟢 IA funcionando',
        database: '🟢 Banco de dados conectado',
      },
    },
  })
  async getStatus() {
    const dbStatus = await this.iaService.checkDatabase();
    const iaStatus = await this.iaService.checkIA();

    return {
      ia: iaStatus ? '🟢 IA funcionando' : '🔴 IA offline',
      database: dbStatus ? '🟢 Banco de dados conectado' : '🔴 Banco desconectado',
    };
  }
}
