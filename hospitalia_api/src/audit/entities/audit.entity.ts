import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actorId: number;

  @Column()
  action: string;

  @Column()
  entity: string;

  @Column('text')
  payload: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
