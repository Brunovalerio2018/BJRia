import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Administrador') // Seção no Swagger
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Criar novo administrador
  @Post()
  @ApiOperation({ summary: 'Criar um novo administrador' })
  @ApiResponse({ status: 201, description: 'Administrador criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Admin já existe ou dados inválidos.' })
  async create(@Body() createAdminDto: CreateAdminDto) {
    // Verifica se já existe admin com o mesmo nome ou email
    const adminExistente = await this.adminService.findByNameOrEmail(
      createAdminDto.name,
      createAdminDto.email
    );

    if (adminExistente) {
      throw new BadRequestException(
        'Administrador já existe com esse nome ou email.'
      );
    }

    return this.adminService.create(createAdminDto);
  }

  // Listar todos os administradores
  @Get()
  @ApiOperation({ summary: 'Listar todos os administradores' })
  @ApiResponse({ status: 200, description: 'Lista de administradores retornada.' })
  findAll() {
    return this.adminService.findAll();
  }

  // Obter um administrador pelo ID
  @Get(':id')
  @ApiOperation({ summary: 'Obter um administrador pelo ID' })
  @ApiResponse({ status: 200, description: 'Administrador encontrado.' })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  // Atualizar administrador
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um administrador pelo ID' })
  @ApiResponse({ status: 200, description: 'Administrador atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado.' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  // Remover administrador
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um administrador pelo ID' })
  @ApiResponse({ status: 200, description: 'Administrador removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado.' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
