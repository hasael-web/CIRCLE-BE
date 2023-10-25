import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";
import runValidation from "../utils/validator/runValidation";
import {
  registerSchema,
  loginSchema,
} from "../utils/validator/schema/authSchema";

export default new (class ThreadController {
  register(req: Request, res: Response) {
    if (runValidation(req, res, registerSchema) === "VALID") {
      AuthServices.register(req, res);
    }
  }
  login(req: Request, res: Response) {
    if (runValidation(req, res, loginSchema) === "VALID") {
      AuthServices.login(req, res);
    }
  }
})();
