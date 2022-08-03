import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { DI } from '../server';
import { Image } from '../entities/Image';
import { Tag } from '../entities';
import { TagReq } from '../types';
import Joi from 'joi';
import { validateJSONBody } from '../common';

const router = Router();

router.get('/tags', async (req: Request, res: Response) => {
  // Returns the all image information and its corresponding tags.
  const images = await DI.imageRepository.findAll({ populate: ['tags'] });
  res.json(images);
});

router.get('/tags/:id', async (req: Request, res: Response) => {
  // Returns a single image's information and its tags.
  const schema = Joi.object(
    {
      id: Joi.number().required()
    }
  )
  validateJSONBody(req.params, schema);
  try {
    const image = await DI.imageRepository.findOne(+req.params['id'], { populate: ['tags']});
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
  if (!req.body.name || !req.body.userEmail || !req.body.tags) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  const tagSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.string().required()
  })

  const imageSchema = Joi.object(
    {
      name: Joi.string().required(),
      userEmail: Joi.string().email().required(),
      imagePath: Joi.string().required(),
      tags: Joi.array().items(tagSchema).required()
    }
  )

  try {
    validateJSONBody(req.body, imageSchema);
    const image = new Image(req.body.name, req.body.userEmail, req.body.imagePath);
    await DI.imageRepository.persist(image);

    const addTag = async (tagInfo: TagReq) => {
      const tag = new Tag(tagInfo.name, tagInfo.value, image);
      await DI.tagRepository.persist(tag);
    }

    const tagPromises: Promise<TagReq>[] = [];
    (<TagReq[]>req.body.tags).forEach(tag => {
      addTag(tag);
    });
    await Promise.all(tagPromises);

    await DI.imageRepository.flush();
    await DI.tagRepository.flush();

    res.json({image: image});
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