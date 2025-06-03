import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAuthUserJWTClinicDoctorService1748946590514 implements MigrationInterface {
    name = 'AddAuthUserJWTClinicDoctorService1748946590514'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "refresh" text NOT NULL, "device" text NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a2b400963b49f4af558e787c6" ON "refresh_tokens" ("device") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "phone" text, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "verify" boolean NOT NULL DEFAULT false, "ban" boolean NOT NULL DEFAULT false, "avatar_image" text, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinics" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_79dd2d4fc95a707b7248ebbeadb" UNIQUE ("name"), CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, CONSTRAINT "UQ_019d74f7abcdcb5a0113010cb03" UNIQUE ("name"), CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "middleName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinics_doctors_doctors" ("clinicsId" integer NOT NULL, "doctorsId" integer NOT NULL, CONSTRAINT "PK_9e2b34f12f7bdf8719fc8098b3c" PRIMARY KEY ("clinicsId", "doctorsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a789c32c9b76e5a0bd2e8fee54" ON "clinics_doctors_doctors" ("clinicsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f80a8b67ac89537b287bd10998" ON "clinics_doctors_doctors" ("doctorsId") `);
        await queryRunner.query(`CREATE TABLE "doctors_services_services" ("doctorsId" integer NOT NULL, "servicesId" integer NOT NULL, CONSTRAINT "PK_2c40c59c35b3991933834cc1ffa" PRIMARY KEY ("doctorsId", "servicesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25402ecc528bdc7885e50ded58" ON "doctors_services_services" ("doctorsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f4f1ea17d8809a8ae320db12af" ON "doctors_services_services" ("servicesId") `);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors_doctors" ADD CONSTRAINT "FK_a789c32c9b76e5a0bd2e8fee54c" FOREIGN KEY ("clinicsId") REFERENCES "clinics"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors_doctors" ADD CONSTRAINT "FK_f80a8b67ac89537b287bd109986" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_services_services" ADD CONSTRAINT "FK_25402ecc528bdc7885e50ded58e" FOREIGN KEY ("doctorsId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctors_services_services" ADD CONSTRAINT "FK_f4f1ea17d8809a8ae320db12afa" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors_services_services" DROP CONSTRAINT "FK_f4f1ea17d8809a8ae320db12afa"`);
        await queryRunner.query(`ALTER TABLE "doctors_services_services" DROP CONSTRAINT "FK_25402ecc528bdc7885e50ded58e"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors_doctors" DROP CONSTRAINT "FK_f80a8b67ac89537b287bd109986"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors_doctors" DROP CONSTRAINT "FK_a789c32c9b76e5a0bd2e8fee54c"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_3ddc983c5f7bcf132fd8732c3f4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4f1ea17d8809a8ae320db12af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25402ecc528bdc7885e50ded58"`);
        await queryRunner.query(`DROP TABLE "doctors_services_services"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f80a8b67ac89537b287bd10998"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a789c32c9b76e5a0bd2e8fee54"`);
        await queryRunner.query(`DROP TABLE "clinics_doctors_doctors"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a2b400963b49f4af558e787c6"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}
