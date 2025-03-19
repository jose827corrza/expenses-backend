import { MigrationInterface, QueryRunner } from "typeorm";

export class Schemas1742351296401 implements MigrationInterface {
    name = 'Schemas1742351296401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expense" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" integer NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "projectId" uuid, CONSTRAINT "PK_edd925b450e13ea36197c9590fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_projects_project" ("userId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_26a180af1ec7a8550f5c374fcd8" PRIMARY KEY ("userId", "projectId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_79daf0d2be103f4c30c77ddd6b" ON "user_projects_project" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_936561888bfd63d01c79fe415c" ON "user_projects_project" ("projectId") `);
        await queryRunner.query(`ALTER TABLE "expense" ADD CONSTRAINT "FK_9971c4171ae051e74b833984a30" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" ADD CONSTRAINT "FK_936561888bfd63d01c79fe415c3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_936561888bfd63d01c79fe415c3"`);
        await queryRunner.query(`ALTER TABLE "user_projects_project" DROP CONSTRAINT "FK_79daf0d2be103f4c30c77ddd6be"`);
        await queryRunner.query(`ALTER TABLE "expense" DROP CONSTRAINT "FK_9971c4171ae051e74b833984a30"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_936561888bfd63d01c79fe415c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_79daf0d2be103f4c30c77ddd6b"`);
        await queryRunner.query(`DROP TABLE "user_projects_project"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "expense"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
