import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
const dotenv = require('dotenv');
dotenv.config();

const options: Options<PostgreSqlDriver> =  {
  driver: PostgreSqlDriver,
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
  dbName: process.env.DB_NAME,
  clientUrl: process.env.CLIENT_URL,
  password: process.env.DB_PASSWORD,
  type: 'postgresql',
  migrations: {
    path: './src/migrations',
    snapshot: false
  }
};

export default options;