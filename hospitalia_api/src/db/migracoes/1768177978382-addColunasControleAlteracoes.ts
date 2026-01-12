import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColunasControleAlteracoes1724780002000
  implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("usuarios", [
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      }),
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("usuarios", "created_at");
    await queryRunner.dropColumn("usuarios", "updated_at");
  }
}
