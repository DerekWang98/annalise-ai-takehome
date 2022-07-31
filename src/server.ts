import 'reflect-metadata';
import express from 'express';
import { Image } from './entities/Image';
import { Tag } from './entities/Tag';
import { ImageController } from './controller/image.controller';
import { TagController } from './controller/tag.controller';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { MikroORM, Options, EntityManager, EntityRepository, RequestContext } from '@mikro-orm/core';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  imageRepository: EntityRepository<Image>,
  tagRepository: EntityRepository<Tag>,
};

const app = express();
const port = process.env.PORT || 3000;

(async () => {
  const options: Options<PostgreSqlDriver> = {
    driver: PostgreSqlDriver,
    entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
    entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
    dbName: 'my-db-name',
    type: 'postgresql',
  };
  // TODO: There's a bug with Mikro and postgresqldriver
  DI.orm = await MikroORM.init(options);
  DI.em = DI.orm.em;
  DI.imageRepository = DI.orm.em.getRepository(Image);
  DI.tagRepository = DI.orm.em.getRepository(Tag);

  app.use(express.json());
  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  app.get('/', (req, res) => res.json({ message: 'Welcome to MikroORM express TS example!' }));
  app.use('/image', ImageController);
  app.use('/tag', TagController);
  app.use((req, res) => res.status(404).json({ message: 'No route found' }));

  app.listen(port, () => {
    console.log(`MikroORM express TS example started at http://localhost:${port}`);
  });
})();