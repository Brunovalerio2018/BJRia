import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ⚠️ SEMPRE PRIMEIRO
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD) || 5432,
      username: process.env.USERNAME_BD,
      password: String(process.env.SENHA_BD),
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // só em DEV
    }),

    PatientsModule,

    AdminModule,

    AuthModule,
  ],
})
export class AppModule {}
