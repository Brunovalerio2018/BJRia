import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';
import bcrypt from 'bcryptjs';


dotenv.config();

export const AppDataSource = new DataSource({
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
    const userRepo = AppDataSource.getRepository(User);
    const userCount = await userRepo.count();
    if (userCount === 0) {
      const adminUser = userRepo.create({
        name: 'admin',
        email: 'admin@123.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin', // só se você tiver a coluna role
      });
      await userRepo.save(adminUser);
      console.log('✅ Usuário admin criado: admin / admin123');
    } else {
      console.log(`👤 Número de usuários no banco: ${userCount}`);
    }

    await queryRunner.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco:', err);
  }
}

initializeDatabase();
