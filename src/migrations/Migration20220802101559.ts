import { Migration } from '@mikro-orm/migrations';

export class Migration20220802101559 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "image" ("_id" serial primary key, "id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "name" varchar(255) not null, "user_email" varchar(255) not null);');

    this.addSql('create table "tag" ("_id" serial primary key, "id" varchar(255) not null, "created_at" jsonb not null, "updated_at" jsonb not null, "name" varchar(255) not null, "image__id" int not null, "value" varchar(255) not null);');

    this.addSql('alter table "tag" add constraint "tag_image__id_foreign" foreign key ("image__id") references "image" ("_id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tag" drop constraint "tag_image__id_foreign";');

    this.addSql('drop table if exists "image" cascade;');

    this.addSql('drop table if exists "tag" cascade;');
  }

}
