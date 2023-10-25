import Joi from "joi";

export const addReplySchema = Joi.object({
  content: Joi.string().required().max(500),
  image: Joi.string(),
});

export const updateReplySchema = Joi.object({
  content: Joi.string().required().max(500),
});
