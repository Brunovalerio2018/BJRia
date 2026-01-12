import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  // Criar log de auditoria
  async createLog(userId: number, action: string, entity: string, payload: any): Promise<AuditLog> {
    const log = this.auditRepo.create({
      actorId: userId,
      action,
      entity,
      payload: JSON.stringify(payload),
    });
    return this.auditRepo.save(log);
  }

  // Listar todos os logs de auditoria
  async findAll(): Promise<AuditLog[]> {
    return this.auditRepo.find({ order: { createdAt: 'DESC' } });
  }

  // Buscar log por ID
  async findById(id: number): Promise<AuditLog> {
    const log = await this.auditRepo.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Log de auditoria ${id} não encontrado`);
    }
    return log;
  }
}
