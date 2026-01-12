import * as bcrypt from 'bcryptjs';

import { users } from 'src/users/entities/user.entity';
import { AppDataSource } from '../data-source';

export async function createAdminSeed() {
  const userRepo = AppDataSource.getRepository(users);
  const adminExists = await userRepo.findOne({ where: { email: 'admin@admin.com' } });

  if (!adminExists) {
    const admin = userRepo.create({
      nome: 'admin',
      email: 'admin@admin.com',
      senha: await bcrypt.hash('admin123', 10),
      endereco: '', // valor padrão
      cpf: '', // valor padrão
      matricula: '', // valor padrão
      perfil: 'admin',
    });

    await userRepo.save(admin);
    console.log('✅ Admin criado com sucesso');
  }
}