import { Options } from '@mikro-orm/core';
import { Image, Tag, BaseEntity } from './entities';

const options: Options = {
  type: 'postgresql',
  entities: [Image, Tag, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  debug: true,
};

export default options;