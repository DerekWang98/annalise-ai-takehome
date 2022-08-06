import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { DI } from '../server';
import Joi from 'joi';
import { validateJSONBody } from '../common';
import { Tag } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const tags = await DI.tagRepository.findAll({ populate: ['image'] });
    res.json(tags);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  // Returns a single image's information and its tags.
  const schema = Joi.object(
    {
      id: Joi.number().required()
    }
  )
  try {
    validateJSONBody(req.params, schema);
    const tag = await DI.tagRepository.findOne(+req.params['id']);
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

router.post('/', async (req: Request, res: Response) => {
  const schema = Joi.object(
    {
      name: Joi.string().required(),
      value: Joi.string().required(),
      imageId: Joi.number().integer().required(),
    }
  )

  try {
    validateJSONBody(req.body, schema);
    const image = await DI.imageRepository.findOne(+req.body['imageId']);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const tag = new Tag(req.body.name, req.body.value, image);

    await DI.tagRepository.persistAndFlush(tag);
    res.json({ tag: tag });
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).json({ message: e.message });
    }
    else {
      console.log('Unexpected error', e);
    }
  }
});

export const TagController = router;