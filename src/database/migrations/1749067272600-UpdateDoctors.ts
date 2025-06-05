import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDoctors1749067272600 implements MigrationInterface {
    name = 'UpdateDoctors1749067272600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "password" text NOT NULL`);
    }

}
