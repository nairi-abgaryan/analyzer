import { MigrationInterface, QueryRunner } from 'typeorm';
export class Data1581364688768 implements MigrationInterface {
    name = 'Data1581364688768';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'CREATE TABLE "info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pid" character varying NOT NULL, "description" character varying, "concat" character varying, "data_id" uuid, CONSTRAINT "PK_687dc5e25f4f1ee093a45b68bb7" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE "data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "pid" character varying, "number" character varying, CONSTRAINT "PK_2533602bd9247937e3a4861e173" PRIMARY KEY ("id"))',
            undefined,
        );
        await queryRunner.query(
            'ALTER TYPE "public"."users_role_enum" RENAME TO "users_role_enum_old"',
            undefined,
        );
        await queryRunner.query(
            "CREATE TYPE \"users_role_enum\" AS ENUM('USER', 'ADMIN')",
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum" USING "role"::"text"::"users_role_enum"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
            undefined,
        );
        await queryRunner.query('DROP TYPE "users_role_enum_old"', undefined);
        await queryRunner.query(
            'ALTER TABLE "info" ADD CONSTRAINT "FK_e270c21a9c347b140c974947f80" FOREIGN KEY ("data_id") REFERENCES "data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            'ALTER TABLE "info" DROP CONSTRAINT "FK_e270c21a9c347b140c974947f80"',
            undefined,
        );
        await queryRunner.query(
            'CREATE TYPE "users_role_enum_old" AS ENUM(\'USER\')',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" TYPE "users_role_enum_old" USING "role"::"text"::"users_role_enum_old"',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT \'USER\'',
            undefined,
        );
        await queryRunner.query('DROP TYPE "users_role_enum"', undefined);
        await queryRunner.query(
            'ALTER TYPE "users_role_enum_old" RENAME TO  "users_role_enum"',
            undefined,
        );
        await queryRunner.query('DROP TABLE "data"', undefined);
        await queryRunner.query('DROP TABLE "info"', undefined);
    }
}
