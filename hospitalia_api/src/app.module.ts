import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './auth/auth.guard';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { BedsModule } from './beds/beds.module';
import { HealthModule } from './common/health/health.module';
import { EpidemiologyModule } from './epidemiology/epidemiology.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { IaModule } from './ia/ia.module';
import { PatientsModule } from './patients/patients.module';
import { SettingsModule } from './settings/settings.module';
import { TriageModule } from './triage/triage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    UsersModule,
    AuthModule,
    AdminModule,
    PatientsModule,
    HealthModule,
    IaModule,
    HospitalsModule,
    BedsModule,
    TriageModule,
    EpidemiologyModule,
    SettingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
