import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // ⬅️ ISSO TEM QUE VIR PRIMEIRO
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD),
      username: process.env.USERNAME_BD,
      password: String(process.env.SENHA_BD), // 👈 FORÇA string
      database: process.env.DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
