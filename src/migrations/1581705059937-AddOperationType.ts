import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOperationType1581705059937 implements MigrationInterface {
    name = 'AddOperationType1581705059937'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TYPE "info_operation_enum" AS ENUM('+', '-', '/', '*')`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "operation" "info_operation_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "constant" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "pid" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "value" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "value" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ALTER COLUMN "pid" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "constant"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "operation"`, undefined);
        await queryRunner.query(`DROP TYPE "info_operation_enum"`, undefined);
    }

}
