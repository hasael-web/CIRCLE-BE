import Joi from "joi";

export const updateUserSchema = Joi.object({
  fullName: Joi.string().required().max(100),
  bio: Joi.string().required().max(250),
  userName: Joi.string().required().max(50),
  profilePicture: Joi.string(),
  uploadId: Joi.number(),
});
