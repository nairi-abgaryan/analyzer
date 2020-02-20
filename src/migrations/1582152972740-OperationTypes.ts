import {MigrationInterface, QueryRunner} from "typeorm";

export class OperationTypes1582152972740 implements MigrationInterface {
    name = 'OperationTypes1582152972740'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "info_operation_enum" AS ENUM('plus', 'minus', 'divide', 'multiply', 'noOperation')`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "operation" "info_operation_enum" DEFAULT 'noOperation'`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "constant" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "pid" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD "value" integer NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "value"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD "value" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "pid" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "constant"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "operation"`, undefined);
        await queryRunner.query(`DROP TYPE "info_operation_enum"`, undefined);
    }

}
