import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColunasRestanteUsuarios1724780001000
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("usuarios", [
      new TableColumn({
        name: "telefone",
        type: "varchar",
        length: "20",
        isNullable: true,
      }),
      new TableColumn({
        name: "cpf",
        type: "varchar",
        length: "14",
        isNullable: true,
        isUnique: true,
      }),
      new TableColumn({
        name: "ultimo_login",
        type: "timestamp",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("usuarios", "telefone");
    await queryRunner.dropColumn("usuarios", "cpf");
    await queryRunner.dropColumn("usuarios", "ultimo_login");
  }
}
