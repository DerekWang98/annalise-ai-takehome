import 'reflect-metadata';
import express from 'express';
import { Image } from './entities/Image';
import { Tag } from './entities/Tag';
import { ImageController } from './controller/image.controller';
import { TagController } from './controller/tag.controller';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroORM, EntityManager, EntityRepository, RequestContext } from '@mikro-orm/core';
import options from './mikro-orm.config';
import process from 'process';
import http from 'http';
const dotenv = require('dotenv');
dotenv.config();

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  imageRepository: EntityRepository<Image>,
  tagRepository: EntityRepository<Tag>,
};

const validteEnvVars = (envVar: string, errorMsg: string) => {
  if (process.env[envVar] == null) {
    throw new Error(`ERROR: ${errorMsg}`)
  }
}

validteEnvVars('PORT', 'Provide PORT environment variable for the Postgres database');
validteEnvVars('CLIENT_URL', 'Provide CLIENT_URL environment variable for the Postgres database');
validteEnvVars('DB_NAME', 'Provide DB_NAME environment variable for the Postgres database');
validteEnvVars('DB_PASSWORD', 'Provide DB_PASSWORD environment variable for the Postgres database');

const app = express();
const port = process.env.PORT || 3000;
let server: http.Server;

(async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(options);
  DI.em = DI.orm.em;
  DI.imageRepository = DI.orm.em.getRepository(Image);
  DI.tagRepository = DI.orm.em.getRepository(Tag);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example!' }));
  app.use('/image', ImageController);
  app.use('/tag', TagController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  server = app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();

// Testing purposes
export { app, server };