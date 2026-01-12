import { Controller, Get, Post, Patch, Delete, Body, Param, Req } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Pacientes')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente criado com sucesso' })
  create(@Body() dto: CreatePatientDto, @Req() req: any) {
    const userId = req.user?.id || 0;
    return this.patientsService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os pacientes' })
  @ApiResponse({ status: 200, description: 'Lista de pacientes' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um paciente pelo ID' })
  @ApiResponse({ status: 200, description: 'Paciente encontrado' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar paciente pelo ID' })
  @ApiResponse({ status: 200, description: 'Paciente atualizado' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto, @Req() req: any) {
    const userId = req.user?.id || 0;
    return this.patientsService.update(+id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover paciente pelo ID' })
  @ApiResponse({ status: 200, description: 'Paciente removido' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || 0;
    return this.patientsService.remove(+id, userId);
  }
}
