import { Controller, Post, Body } from '@nestjs/common';
import { AutorizacaoService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// DTO para Swagger
class LoginDto {
  login: string;
  senha: string;
}

@ApiTags('Autorização') // Seção no Swagger
@Controller('autorizacao')
export class AuthController {
  constructor(private readonly authService: AutorizacaoService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do sistema' })
  @ApiBody({
    description: 'Informações de login do usuário',
    type: LoginDto,
    examples: {
      exemploLogin: {
        summary: 'Exemplo de login',
        value: { login: 'usuario@exemplo.com', senha: '123456' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  async login(@Body() body: LoginDto) {
    return this.authService.signIn(body.login, body.senha);
  }
}
