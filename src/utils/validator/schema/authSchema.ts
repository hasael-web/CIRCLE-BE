import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().required().max(100),
  email: Joi.string().email().required().max(50),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  emailOrUsername: Joi.string().allow(""),
  password: Joi.string().required(),
});
