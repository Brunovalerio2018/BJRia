import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { AuditService } from '../audit/audit.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: CreatePatientDto, userId: number) {
    const patient = this.patientRepo.create(dto);
    await this.patientRepo.save(patient);

    await this.auditService.createLog(userId, 'CREATE_PATIENT', 'Patient', patient);

    return patient;
  }

  findAll() {
    return this.patientRepo.find();
  }

  findOne(id: number) {
    return this.patientRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePatientDto, userId: number) {
    await this.patientRepo.update(id, dto);
    const patient = await this.findOne(id);

    await this.auditService.createLog(userId, 'UPDATE_PATIENT', 'Patient', patient);

    return patient;
  }

  async remove(id: number, userId: number) {
    const patient = await this.findOne(id);
    if (!patient) return null;

    await this.patientRepo.delete(id);

    await this.auditService.createLog(userId, 'DELETE_PATIENT', 'Patient', patient);

    return { deleted: true };
  }
}
