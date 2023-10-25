import Joi from "joi";

export const addThreadSchema = Joi.object({
  content: Joi.string().required().max(500),
  image: Joi.string(),
});

export const updateThreadSchema = Joi.object({
  content: Joi.string().required().max(500),
});
