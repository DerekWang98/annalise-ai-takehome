import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Author, Book, BookTag, Publisher, BaseEntity } from './entities';

const options: Options = {
  type: 'postgresql',
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
  dbName: 'mikro-orm-express-ts',
  highlighter: new SqlHighlighter(),
  debug: true,
};

export default options;