import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';

import { DI } from '../server';
import { Tag } from '../entities/Tag';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const tags = await DI.tagRepository.findAll({ populate: ['image']});
  res.json(tags);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const tag = await DI.tagRepository.findOne(req.params.id, { populate: ['image']});

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    res.json(tag);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

// router.put('/:id', async (req: Request, res: Response) => {
//   try {
//     const tag = await DI.tagRepository.findOne(req.params.id);

//     if (!tag) {
//       return res.status(404).json({ message: 'Tag not found' });
//     }

//     wrap(tag).assign(req.body);
//     await DI.tagRepository.persist(tag);

//     res.json(tag);
//   } catch (e) {
//     if (e instanceof Error) {
//       return res.status(400).json({ message: e.message });
//     }
//     else {
//       console.log('Unexpected error', e);
//     }
//   }
// });

export const TagController = router;