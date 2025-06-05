import { MigrationInterface, QueryRunner } from "typeorm";

export class NewClinicAndDoctor1749064017105 implements MigrationInterface {
    name = 'NewClinicAndDoctor1749064017105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "doctor_clinics" ("doctor_id" integer NOT NULL, "clinic_id" integer NOT NULL, CONSTRAINT "PK_d834afe319aa3ee7b3b0512f471" PRIMARY KEY ("doctor_id", "clinic_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b2e208912ef83837bc062661aa" ON "doctor_clinics" ("doctor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b8acdd4f81a745b7cafe31e78" ON "doctor_clinics" ("clinic_id") `);
        await queryRunner.query(`CREATE TABLE "doctor_services" ("doctor_id" integer NOT NULL, "service_id" integer NOT NULL, CONSTRAINT "PK_6c076fe4e383606e988414f18f7" PRIMARY KEY ("doctor_id", "service_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7332c5a1ffea02df1ef5c16c55" ON "doctor_services" ("doctor_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_8679bceaa0d0514f7e2a18ec12" ON "doctor_services" ("service_id") `);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "middleName"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "phoneNumber"`);
        await queryRunner.query(`ALTER TABLE "clinics" DROP CONSTRAINT "UQ_79dd2d4fc95a707b7248ebbeadb"`);
        await queryRunner.query(`ALTER TABLE "doctor_clinics" ADD CONSTRAINT "FK_b2e208912ef83837bc062661aad" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctor_clinics" ADD CONSTRAINT "FK_3b8acdd4f81a745b7cafe31e789" FOREIGN KEY ("clinic_id") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_services" ADD CONSTRAINT "FK_7332c5a1ffea02df1ef5c16c552" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctor_services" ADD CONSTRAINT "FK_8679bceaa0d0514f7e2a18ec12b" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_services" DROP CONSTRAINT "FK_8679bceaa0d0514f7e2a18ec12b"`);
        await queryRunner.query(`ALTER TABLE "doctor_services" DROP CONSTRAINT "FK_7332c5a1ffea02df1ef5c16c552"`);
        await queryRunner.query(`ALTER TABLE "doctor_clinics" DROP CONSTRAINT "FK_3b8acdd4f81a745b7cafe31e789"`);
        await queryRunner.query(`ALTER TABLE "doctor_clinics" DROP CONSTRAINT "FK_b2e208912ef83837bc062661aad"`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD CONSTRAINT "UQ_79dd2d4fc95a707b7248ebbeadb" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "phoneNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "middleName" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8679bceaa0d0514f7e2a18ec12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7332c5a1ffea02df1ef5c16c55"`);
        await queryRunner.query(`DROP TABLE "doctor_services"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3b8acdd4f81a745b7cafe31e78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2e208912ef83837bc062661aa"`);
        await queryRunner.query(`DROP TABLE "doctor_clinics"`);
    }

}
