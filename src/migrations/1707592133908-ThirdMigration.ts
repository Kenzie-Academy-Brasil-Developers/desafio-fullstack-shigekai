import { MigrationInterface, QueryRunner } from "typeorm";

export class ThirdMigration1707592133908 implements MigrationInterface {
    name = 'ThirdMigration1707592133908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_emails" ADD "main" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_emails" DROP COLUMN "main"`);
    }

}
