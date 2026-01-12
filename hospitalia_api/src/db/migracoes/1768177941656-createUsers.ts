import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuarios1724780000000 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "nome",
            type: "varchar",
            length: "150",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "senha",
            type: "varchar",
          },
          {
            name: "role",
            type: "varchar",
            default: "'user'",
          },
          {
            name: "ativo",
            type: "boolean",
            default: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
