import { Controller, Post, Body } from '@nestjs/common';
import { AutorizacaoService } from './auth.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Autorização')
@Controller('autorizacao')
export class AuthController {
  constructor(private readonly authService: AutorizacaoService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do sistema' })
  async login(@Body() body: { login: string; senha: string }) {
    return this.authService.signIn(body.login, body.senha);
  }
}
