import { Controller, Get, Param } from '@nestjs/common';
import { AuditService } from './audit.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auditoria')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os logs de auditoria' })
  @ApiResponse({ status: 200, description: 'Logs retornados com sucesso.' })
  async findAll() {
    return this.auditService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter log de auditoria por ID' })
  @ApiResponse({ status: 200, description: 'Log retornado com sucesso.' })
  async findOne(@Param('id') id: number) {
    return this.auditService.findById(id);
  }
}
