import Joi from 'joi';
import { RequestHandler } from 'express';

export const validatePostEvents: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    date: Joi.date().iso().required(),
    location: Joi.string().required(),
    description: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  return next();
};

export const validateGetEvents: RequestHandler = (req, res, next) => {
  const schema = Joi.object({
    date: Joi.date().iso().optional(),
    location: Joi.string().optional(),
    type: Joi.string().optional(),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  return next();
};
