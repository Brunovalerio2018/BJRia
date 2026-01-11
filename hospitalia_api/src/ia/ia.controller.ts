import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { IaService } from './ia.service';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(
    private readonly iaService: IaService,
    private readonly dataSource: DataSource,
  ) {}

  @Get('status')
  @ApiOperation({
    summary: 'Verifica status da IA e conexão com o banco de dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Status da IA e do banco',
    schema: {
      example: {
        ia: 'IA funcionando',
        database: 'online',
        timestamp: '2026-01-11T00:00:00.000Z',
      },
    },
  })
  async getStatus() {
    // Verifica IA
    const iaStatus = await this.iaService.checkIA();

    // Verifica banco de dados
    let dbStatus: 'online' | 'offline' = 'offline';
    try {
      await this.dataSource.query('SELECT 1');
      dbStatus = 'online';
    } catch (error) {
      dbStatus = 'offline';
    }

    return {
      ia: iaStatus ? 'IA funcionando' : 'IA offline',
      database: dbStatus,
      timestamp: new Date(),
    };
  }




}