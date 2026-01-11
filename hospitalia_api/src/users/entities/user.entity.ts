// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string; // nome completo do usuário

  @Column({ unique: true, length: 100 })
  email: string; // email único para login

  @Column()
  password: string; // senha (de preferência armazenada como hash)

  @Column({ type: 'varchar', length: 20, default: 'user' })
  role: string; // 'user' ou 'admin'

  @CreateDateColumn()
  created_at: Date; // data de criação do registro

  @UpdateDateColumn()
  updated_at: Date; // data da última atualização
}
