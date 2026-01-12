import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AutorizacaoService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// DTO de login
class LoginDto {
  login: string;
  senha: string;
}

@ApiTags('Autorização')
@Controller('autorizacao')
export class AuthController {
  constructor(
    private readonly authService: AutorizacaoService,
    private readonly adminService: AdminService, // injetando adminService
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do sistema' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() body: LoginDto) {
    const { login, senha } = body;

    // Verifica se há pelo menos um admin cadastrado
    const admins = await this.adminService.findAll();
    if (admins.length === 0) {
      throw new BadRequestException(
        'Nenhum administrador cadastrado. Crie um admin primeiro.'
      );
    }

    // Tenta autenticar
    const user = await this.authService.signIn(login, senha);

    if (!user) {
      throw new BadRequestException('Usuário ou senha inválidos.');
    }

    return {
      success: true,
      userInfo: user, // retorna dados do usuário (nome, matrícula, avatar etc)
      token: user.token, // se seu AuthService gerar JWT
    };
  }
}
