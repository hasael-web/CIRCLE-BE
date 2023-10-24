import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const runValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: Joi.ObjectSchema
) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      message: "Validation Failed",
      error: error.details[0].message,
    });
  }

  next();
};

export default runValidation;
