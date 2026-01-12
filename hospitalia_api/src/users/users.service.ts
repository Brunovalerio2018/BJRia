import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) // <--- aqui, automaticamente o Nest resolve o repositório
    private readonly usuariosRepository: Repository<Users>,
  ) {}

  async create(dados) {
    const usuario = this.usuariosRepository.create(dados);
    return await this.usuariosRepository.save(usuario);
  }

  async buscaPorId(id: number) {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async buscaPorLogin(login: string) {
    return this.usuariosRepository.findOne({ where: { matricula: login } });
  }

  async buscaTodos() {
    return this.usuariosRepository.find({
      select: { id: true, nome: true, perfil: true, cpf: true, matricula: true },
    });
  }
}
