import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUserAvatar1581402921258 implements MigrationInterface {
    name = 'RemoveUserAvatar1581402921258';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "users" DROP COLUMN "avatar"',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "users" ADD "avatar" character varying',
            undefined,
        );
    }
}
