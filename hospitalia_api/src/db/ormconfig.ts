import 'reflect-metadata'; // necessário para TypeORM
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
  synchronize: false, // se quiser criar tabelas automático em dev, coloque true
  dropSchema: false,
  logging: ['warn', 'error'],
  migrations: [join(__dirname, '/migracoes/*.{ts,js}')],
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conexão com PostgreSQL estabelecida!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no PostgreSQL:', err);
  });
