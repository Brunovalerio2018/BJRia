import { Module } from "@nestjs/common";


import { UsersProviders } from "./users.service.spec";
import { UsersService } from "./users.service";
import { DatabaseModule } from "src/db/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersService],
  providers: [...UsersProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
