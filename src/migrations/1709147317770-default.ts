import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1709147317770 implements MigrationInterface {
    name = 'Default1709147317770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "companyId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "company" ADD "products" jsonb`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_a331e634b87a7dbba2e7fccce19"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "products"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
