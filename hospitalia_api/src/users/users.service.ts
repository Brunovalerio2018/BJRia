import { Inject, Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { users } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USUARIOS_REPOSITORY")
    private usuariosRepository: Repository<users>
  ) {}

  async create(dados) {
    try {
      const response =  await this.usuariosRepository
        .createQueryBuilder()
        .insert()
        .into(users)
        .values({
          ...dados,
        })
        .execute();
      return response;
    } catch (error) {
      return error;
    }
  }
  async buscaPorId(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id: id },
    });

    return usuario;
  }

  async buscaPorLogin(login: string) {
    const usuario = await this.usuariosRepository.findOne({
      where: { matricula: login },
    });

    return usuario;
  }

  async buscaTodos(){
    const usuarios = await this.usuariosRepository.find({
    select:{id:true,nome:true,endereco:false,perfil:true,cpf:true,matricula:true,senha:false}
    });
  
    return usuarios;
  }
}
