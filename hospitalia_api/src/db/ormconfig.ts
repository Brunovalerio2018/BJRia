import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_BD,
  port: Number(process.env.PORT_BD) || 5432,
  username: process.env.USERNAME_BD,
  password: process.env.SENHA_BD,
  database: process.env.DATABASE_NAME,
  entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
  synchronize: true, // cria tabelas automático em dev
  dropSchema: true,
  logging: ['warn', 'error', 'info'],
  migrations: [join(__dirname, '/migracoes/*.{ts,js}')],
});

async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Conexão com PostgreSQL estabelecida!');

    // Lista todas as tabelas existentes no banco
    const queryRunner = AppDataSource.createQueryRunner();
    const tables = await queryRunner.getTables(['users', 'auth']);
    if (tables.length > 0) {
      tables.forEach((table) => {
        console.log(`📄 Tabela encontrada: ${table.name}`);
      });
    } else {
      console.log('⚠️ Nenhuma tabela "users" ou "auth" encontrada ainda.');
    }

    // Verificar se existem registros no users
    const userCount = await AppDataSource.getRepository('User').count().catch(() => null);
    if (userCount !== null) {
      console.log(`👤 Número de usuários no banco: ${userCount}`);
    } else {
      console.log('⚠️ Repositório de usuários não encontrado ou tabela vazia.');
    }

    await queryRunner.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ou sincronizar o banco:', err);
  }
}

initializeDatabase();
