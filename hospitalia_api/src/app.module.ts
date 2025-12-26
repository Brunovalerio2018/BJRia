import { Module } from '@nestjs/common';
import { IaModule } from './ia/ia.module';

@Module({
  imports: [IaModule],
})
export class AppModule {}
