import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

import bcrypt from 'bcryptjs';
import { users } from 'src/users/entities/user.entity';
import { AppDataSource } from './data-source';


dotenv.config();

export const connectionOptions = new DataSource({
  type: 'postgres',
  host: process.env.HOST_BD,
  port: Number(process.env.PORT_BD) || 5432,
  username: process.env.USERNAME_BD,
  password: process.env.SENHA_BD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
  synchronize: true,
  dropSchema: true,
  logging: ['warn', 'error', 'info'],
  migrations: [join(__dirname, '/migracoes/*.{ts,js}')],
});

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conexão com PostgreSQL estabelecida!');

    const queryRunner = AppDataSource.createQueryRunner();

    // Listar tabelas
    const allTables = await queryRunner.getTables();
    console.log('📦 Tabelas existentes no banco:');
    allTables.forEach(t => console.log(`- ${t.name}`));

    // Criar usuário admin caso não exista
        const userRepo = AppDataSource.getRepository(users);
    const userCount = await userRepo.count();
    if (userCount === 0) {
      const adminUser = userRepo.create({
        nome: 'Admin',
        email: 'admin@123.com',
        senha: await bcrypt.hash('admin123', 10),
        endereco: '', // ou um valor padrão
        cpf: '', // ou um valor padrão
        matricula: '', // ou um valor padrão
        perfil: 'admin',
      });
      await userRepo.save(adminUser);
      console.log('✅ Usuário admin criado: admin@123.com / admin123');
    } else {
      console.log(`👤 Número de usuários no banco: ${userCount}`);
    }
    
    await queryRunner.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco:', err);
  }
}

initializeDatabase();
