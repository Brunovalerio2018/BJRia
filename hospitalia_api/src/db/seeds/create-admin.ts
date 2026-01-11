import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../users/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersSeed implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async onModuleInit() {
    const count = await this.userRepo.count();

    if (count === 0) {
      const admin = this.userRepo.create({
        name: 'Admin',
        email: 'admin@admin.com',
        password: await bcrypt.hash('admin123', 10),
      });

      await this.userRepo.save(admin);
      console.log('✅ Usuário admin criado');
    }
  }
}
