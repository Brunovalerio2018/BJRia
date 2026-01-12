import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]), // essencial
    AuditModule,                         // para poder usar AuditService
  ],
  providers: [PatientsService],
  controllers: [PatientsController],
})
export class PatientsModule {}
