import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IaService } from './ia.service';

@ApiTags('IA')
@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Get('status')
  @ApiOperation({ summary: 'Verifica se a IA está online' })
  @ApiResponse({
    status: 200,
    description: 'IA online',
    schema: { example: { status: 'online' } },
  })
  checkIA() {
    const online = this.iaService.checkIA();
    return { status: online ? 'online' : 'offline' };
  }

  @Get('database')
  @ApiOperation({ summary: 'Verifica se o banco está conectado' })
  @ApiResponse({
    status: 200,
    description: 'Banco conectado',
    schema: { example: { connected: true } },
  })
  checkDatabase() {
    const connected = this.iaService.checkDatabase();
    return { connected };
  }
}
