import {MigrationInterface, QueryRunner} from "typeorm";

export class InfoDataRelation1581530964579 implements MigrationInterface {
    name = 'InfoDataRelation1581530964579'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "info" DROP CONSTRAINT "FK_e270c21a9c347b140c974947f80"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" DROP COLUMN "data_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD "info_id" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "data" ADD CONSTRAINT "FK_eef22db9a15006c2a8415a77e47" FOREIGN KEY ("info_id") REFERENCES "info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "data" DROP CONSTRAINT "FK_eef22db9a15006c2a8415a77e47"`, undefined);
        await queryRunner.query(`ALTER TABLE "data" DROP COLUMN "info_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD "data_id" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "info" ADD CONSTRAINT "FK_e270c21a9c347b140c974947f80" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
