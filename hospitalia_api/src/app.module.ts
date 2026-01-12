import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from "@nestjs/core";

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { AdminModule } from './admin/admin.module';
import { PatientsModule } from './patients/patients.module';
import { HealthModule } from './common/health/health.module';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST_BD,
      port: Number(process.env.PORT_BD) || 5432,
      username: process.env.USERNAME_BD,
      password: process.env.SENHA_BD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,      // <- precisa vir antes do APP_GUARD
    AdminModule,
    PatientsModule,
    HealthModule,
    IaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Guard global agora com JwtService disponível
    },
  ],
})
export class AppModule {}
