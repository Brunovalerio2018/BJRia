import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AutorizacaoService {
  constructor(
    private usuariosService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Método principal de login
  async signIn(login: string, password: string): Promise<any> {
    // Busca o usuário pelo login
    const user = await this.usuariosService.buscaPorLogin(login);

    // Se não encontrar ou senha inválida
    if (!user || user.senha !== password) {
      throw new UnauthorizedException('Usuário ou senha inválidos.');
    }

    // Remove senha do objeto retornado
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...result } = user;

    // Payload para o JWT
    const payload = { sub: user.id, username: user.matricula };

    // Retorna token e dados do usuário
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo: result,
    };
  }
}
