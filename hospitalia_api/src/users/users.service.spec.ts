import { DataSource } from "typeorm";
import { Users } from "src/users/entities/user.entity";

export const UsersProviders = [
  {
    provide: "USERS_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ["DATABASE_CONNECTION"],
  },
];
