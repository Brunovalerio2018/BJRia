import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AutorizacaoService {
    login(login: string, senha: string) {
        throw new Error('Method not implemented.');
    }
    constructor(private usuariosService: UsersService,
        private jwtService: JwtService
    ) {}

  async signIn(login: string, password: string): Promise<any> {
    const user = await this.usuariosService.buscaPorLogin(login);
    if (user?.senha !== password) {
      throw new UnauthorizedException();
    }
    const { senha , ...result } = user;
    const payload = { sub: user.id, username: user.matricula };
    return {
      access_token: await this.jwtService.signAsync(payload),
      userInfo:result
    };
    
} 
}
