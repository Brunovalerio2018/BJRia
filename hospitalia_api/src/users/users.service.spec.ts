import { DataSource } from "typeorm";
import { users } from "src/users/entities/user.entity";

export const UsersProviders = [
  {
    provide: "USERS_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(users),
    inject: ["DATABASE_CONNECTION"],
  },
];
