import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const options: Options<PostgreSqlDriver> =  {
  driver: PostgreSqlDriver,
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: 'image_storage',
  clientUrl: 'postgresql://postgres@localhost:55432',
  password: 'postgres',
  type: 'postgresql',
};

export default options;