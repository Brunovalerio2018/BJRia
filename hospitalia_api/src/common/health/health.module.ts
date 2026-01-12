import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])], // sem entidade específica, apenas para injeção
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
