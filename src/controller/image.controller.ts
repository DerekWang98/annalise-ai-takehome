import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';
import { DI } from '../server';
import { Image } from '../entities/Image';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const images = await DI.imageRepository.findAll({ populate: ['tags'] });
  res.json(images);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const image = await DI.imageRepository.findOne(req.params.id, { populate: ['tags']});

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.json(image);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.userEmail) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const image = new Image(req.body.name, req.body.userEmail);
    wrap(image).assign(req.body);
    await DI.imageRepository.persist(image);

    res.json(image);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const image = await DI.imageRepository.findOne(req.params.id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    wrap(image).assign(req.body);
    await DI.imageRepository.persist(image);

    res.json(image);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

export const ImageController = router;