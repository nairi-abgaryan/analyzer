import {MigrationInterface, QueryRunner} from "typeorm";

export class DataNumberToValue1581538973255 implements MigrationInterface {
    name = 'DataNumberToValue1581538973255'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" RENAME COLUMN "number" TO "value"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" RENAME COLUMN "value" TO "number"`, undefined);
    }

}
