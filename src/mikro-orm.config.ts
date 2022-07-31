import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Image, Tag, BaseEntity } from './entities';

const options: Options = {
  type: 'postgresql',
  entities: [Image, Tag, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default options;