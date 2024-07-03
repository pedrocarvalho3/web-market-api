import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709755278793 implements MigrationInterface {
    name = 'Default1709755278793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "signatures" ("id" SERIAL NOT NULL, "plan" text NOT NULL, "initialDate" TIMESTAMP NOT NULL DEFAULT now(), "endDate" TIMESTAMP, "companyId" integer, CONSTRAINT "PK_f56eb3cd344ce7f9ae28ce814eb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "signatures" ADD CONSTRAINT "FK_b92abb6ad8870505b145bce3410" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "signatures" DROP CONSTRAINT "FK_b92abb6ad8870505b145bce3410"`);
        await queryRunner.query(`DROP TABLE "signatures"`);
    }

}
