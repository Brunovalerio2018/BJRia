import { Module } from '@nestjs/common';
import { IaModule } from './ia/ia.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [IaModule, UsersModule],
})
export class AppModule {}
