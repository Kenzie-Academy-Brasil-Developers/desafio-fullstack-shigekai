import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1707405481066 implements MigrationInterface {
    name = 'InitialMigration1707405481066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contact_emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(256) NOT NULL, "updatedAt" date NOT NULL DEFAULT now(), "contactId" uuid, CONSTRAINT "PK_fe57f999770a7da0338a9b29db3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(16) NOT NULL, "updatedAt" date NOT NULL DEFAULT now(), "contactId" uuid, CONSTRAINT "PK_3263d07aba7c4dd305ee995148f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "description" text NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(256) NOT NULL, "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_6594597afde633cfeab9a806e4f" UNIQUE ("email"), CONSTRAINT "PK_3ef6c4be97ba94ea3ba65362ad0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying(16) NOT NULL, "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "UQ_83a017f2778ec6e902a52e1ae8b" UNIQUE ("phone"), CONSTRAINT "PK_975f5d595e466bdcbb7b0afc2b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "password" character varying(256) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "contact_emails" ADD CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_phones" ADD CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_emails" ADD CONSTRAINT "FK_569342223a28f006d9bf897c7c9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_phones" ADD CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_phones" DROP CONSTRAINT "FK_4615e35b764e3aa70adfaad6d2f"`);
        await queryRunner.query(`ALTER TABLE "user_emails" DROP CONSTRAINT "FK_569342223a28f006d9bf897c7c9"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "contact_phones" DROP CONSTRAINT "FK_3fc789e7184faf89342c1ea2db3"`);
        await queryRunner.query(`ALTER TABLE "contact_emails" DROP CONSTRAINT "FK_fc3388dceb0df025631d4b8cdcf"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "user_phones"`);
        await queryRunner.query(`DROP TABLE "user_emails"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "contact_phones"`);
        await queryRunner.query(`DROP TABLE "contact_emails"`);
    }

}
