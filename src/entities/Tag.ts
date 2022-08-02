import { Cascade, Collection, Entity, OneToMany, Property, ManyToOne } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';
import { Image } from './Image'

@Entity()
export class Tag extends BaseEntity {

  @Property()
  name: string;

  @Property()
  value: string;

  @ManyToOne(() => Image)
  image?: Image;

  constructor(name: string, value: string, image: Image ) {
    super();
    this.name = name;
    this.value = value;
    this.image = image;
  }
}