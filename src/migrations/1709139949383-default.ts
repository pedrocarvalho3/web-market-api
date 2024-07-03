import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709139949383 implements MigrationInterface {
    name = 'Default1709139949383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" text NOT NULL, "cnpj" text NOT NULL, "description" text NOT NULL, "profileImage" text, "userId" integer, CONSTRAINT "REL_c41a1d36702f2cd0403ce58d33" UNIQUE ("userId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }

}
