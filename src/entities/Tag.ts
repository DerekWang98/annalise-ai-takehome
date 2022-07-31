import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { Image } from './Image'

@Entity()
export class Tag extends BaseEntity {

  @Property()
  name: string;

  @ManyToOne(() => Image)
  image?: Image;

  @Property()
  value: string;

  constructor(name: string, image: Image, value: string) {
    super();
    this.name = name;
    this.image = image;
    this.value = value;
  }
}