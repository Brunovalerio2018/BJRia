import { AppDataSource } from '../data-source';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

export async function createAdmin() {
  const userRepo = AppDataSource.getRepository(User);

  const adminExists = await userRepo.findOne({
    where: { email: 'admin@admin.com' },
  });

  if (!adminExists) {
    const admin = userRepo.create({
      name: 'Administrador',
      email: 'admin@admin.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    });

    await userRepo.save(admin);
    console.log('✅ Admin criado com sucesso');
  } else {
    console.log('ℹ️ Admin já existe');
  }
}