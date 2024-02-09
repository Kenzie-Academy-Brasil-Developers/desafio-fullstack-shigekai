import { MigrationInterface, QueryRunner } from "typeorm";

export class SecondMigration1707422222450 implements MigrationInterface {
    name = 'SecondMigration1707422222450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`ALTER TABLE "contact_phones" DROP CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "user_phones" DROP CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f"`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_phones" ADD CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_phones" ADD CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_phones" DROP CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "contact_phones" DROP CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3"`);
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`ALTER TABLE "user_phones" ADD CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_phones" ADD CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
