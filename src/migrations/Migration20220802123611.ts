import { Migration } from '@mikro-orm/migrations';

export class Migration20220802123611 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "image" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "name" varchar(255) not null, "user_email" varchar(255) not null, "image_path" varchar(255) not null);');

    this.addSql('create table "tag" ("id" serial primary key, "created_at" timestamp not null, "updated_at" timestamp not null, "name" varchar(255) not null, "value" varchar(255) not null, "image_id" int not null);');

    this.addSql('alter table "tag" add constraint "tag_image_id_foreign" foreign key ("image_id") references "image" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "tag" drop constraint "tag_image_id_foreign";');

    this.addSql('drop table if exists "image" cascade;');

    this.addSql('drop table if exists "tag" cascade;');
  }

}
