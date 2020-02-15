import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeTypes1581706720078 implements MigrationInterface {
    name = 'ChangeTypes1581706720078'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "constant"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "constant" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD "value" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD "value" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "constant"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "constant" character varying`, undefined);
    }

}
