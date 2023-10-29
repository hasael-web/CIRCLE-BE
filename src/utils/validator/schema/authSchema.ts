import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().required().max(100),
  email: Joi.string().email().required().max(50),
  password: Joi.string()
    .required()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .message(
      '"password" must contains one lowercase character, one uppercase character, one number, and one special character from (@$!%*?&)'
    ),
});

export const loginSchema = Joi.object({
  emailOrUsername: Joi.string().required(),
  password: Joi.string().required(),
});
