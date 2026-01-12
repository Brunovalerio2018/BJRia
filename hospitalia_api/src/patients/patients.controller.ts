import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Pacientes')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo paciente' })
  @ApiResponse({ status: 201, description: 'Paciente criado com sucesso' })
  create(@Body() dto: CreatePatientDto) {
    return this.patientsService.create(dto);
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
  update(@Param('id') id: string, @Body() dto: UpdatePatientDto) {
    return this.patientsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover paciente pelo ID' })
  @ApiResponse({ status: 200, description: 'Paciente removido' })
  @ApiResponse({ status: 404, description: 'Paciente não encontrado' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
