import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { IaService } from '../ia/ia.service';

@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly iaService: IaService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Verifica se IA e Banco de Dados estão funcionando',
  })
  @ApiResponse({
    status: 200,
    description: 'Status da IA e do Banco',
    schema: {
      example: {
        ia: 'online',
        database: 'online',
        timestamp: '2026-01-11T15:30:00Z',
      },
    },
  })
  async getStatus() {
    // 🔹 Banco
    let databaseStatus = 'offline';
    try {
      await this.dataSource.query('SELECT 1');
      databaseStatus = 'online';
    } catch {}

    // 🔹 IA
    let iaStatus = 'offline';
    try {
      const ok = await this.iaService.checkIA();
      iaStatus = ok ? 'online' : 'offline';
    } catch {}

    return {
      ia: iaStatus,
      database: databaseStatus,
      timestamp: new Date().toISOString(),
    };
  }
}
