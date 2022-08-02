import { PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {

  @PrimaryKey()
  id!: number;

  @Property({ columnType: 'timestamp' })
  createdAt = new Date();

  @Property({ columnType: 'timestamp', onUpdate: () => new Date() })
  updatedAt = new Date();
}