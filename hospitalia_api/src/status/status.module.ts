import { Module } from '@nestjs/common';
import { StatusController } from './status.controller';
import { IaModule } from '../ia/ia.module';

@Module({
  imports: [IaModule],
  controllers: [StatusController],
})
export class StatusModule {}
