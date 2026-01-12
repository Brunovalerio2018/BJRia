import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { ComponentStatus } from './status.service';

@ApiTags('Status 🟢🟠🔴')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get()
  @ApiOperation({ summary: 'Verifica status de API, IA e Banco' })
  @ApiResponse({
    status: 200,
    description: 'Semáforo de status dos sistemas',
  })
  async getStatus() {
    return this.statusService.getStatus();
  }
}
