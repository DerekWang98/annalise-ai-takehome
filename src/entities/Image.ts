import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Tag } from './Tag';

@Entity()
export class Image extends BaseEntity {

  @Property()
  name: string;

  @Property()
  userEmail: string;

  @Property()
  imagePath: string;

  @OneToMany({ entity: () => Tag, mappedBy: 'image', orphanRemoval: false })
  tags = new Collection<Tag>(this);

  constructor(name: string, userEmail: string, imagePath: string) {
    super();
    this.name = name;
    this.userEmail = userEmail;
    this.imagePath = imagePath;
  }
}