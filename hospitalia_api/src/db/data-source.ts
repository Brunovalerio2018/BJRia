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
  migrations: [join(__dirname, '/migracoes/*.{ts,js}')],
  synchronize: false,
  logging: ['warn', 'error'],
});
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Conexão com PostgreSQL estabelecida!');
    })  