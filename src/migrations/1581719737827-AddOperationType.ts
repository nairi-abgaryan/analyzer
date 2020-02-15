import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOperationType1581719737827 implements MigrationInterface {
    name = 'AddOperationType1581719737827'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TYPE "public"."info_operation_enum" RENAME TO "info_operation_enum_old"`, undefined);
        await queryRunner.query(`CREATE TYPE "info_operation_enum" AS ENUM('+', '-', '/', '*', '0')`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" TYPE "info_operation_enum" USING "operation"::"text"::"info_operation_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" SET DEFAULT '0'`, undefined);
        await queryRunner.query(`DROP TYPE "info_operation_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" SET DEFAULT '0'`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" DROP DEFAULT`, undefined);
        await queryRunner.query(`CREATE TYPE "info_operation_enum_old" AS ENUM('+', '-', '/', '*')`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" TYPE "info_operation_enum_old" USING "operation"::"text"::"info_operation_enum_old"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ALTER COLUMN "operation" SET DEFAULT '0'`, undefined);
        await queryRunner.query(`DROP TYPE "info_operation_enum"`, undefined);
        await queryRunner.query(`ALTER TYPE "info_operation_enum_old" RENAME TO  "info_operation_enum"`, undefined);
    }

}
