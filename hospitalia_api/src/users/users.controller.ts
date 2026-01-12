import { Controller, Get, Post, Body, BadRequestException } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { Public } from "src/auth/constantes";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { UsersPorIdDto } from "./dto/por-id.dto";
import { UsersService } from "./users.service";

@ApiTags("Usuarios") // Seção no Swagger
@ApiBearerAuth('access-token')
@Controller("usuarios")
export class UsersController {
  constructor(private readonly usuariosService: UsersService) {}

  @Public()
  @Post("novo")
  @ApiOperation({ summary: "Cria um novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso" })
  @ApiResponse({ status: 400, description: "Erro ao criar usuário (ex: login já cadastrado)" })
  async create(@Body() dados: CreateUsuarioDto) {
    // Verifica se já existe admin
    if (dados.nome.toLowerCase() === 'admin') {
      throw new BadRequestException("Usuário 'admin' já cadastrado.");
    }
    return this.usuariosService.create(dados);
  }

  @Post("buscar")
  @ApiOperation({ summary: "Busca um usuário por ID ou login" })
  @ApiResponse({ status: 200, description: "Usuário encontrado" })
  @ApiResponse({ status: 400, description: "Informe 'id' ou 'login' para busca" })
  async findById(@Body() dados: UsersPorIdDto) {
    if (dados.id !== undefined) return this.usuariosService.buscaPorId(dados.id);
    if (dados.login) return this.usuariosService.buscaPorLogin(dados.login);
    throw new BadRequestException("Informe 'id' ou 'login' para buscar o usuário.");
  }

  @Get("todos")
  @ApiOperation({ summary: "Lista todos os usuários" })
  @ApiResponse({ status: 200, description: "Lista de usuários" })
  async findAll() {
    return this.usuariosService.buscaTodos();
  }
}
