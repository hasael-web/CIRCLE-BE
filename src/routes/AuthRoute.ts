import { NextFunction, Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController";
import runValidation from "../utils/validator/runValidation";
import { loginSchema, registerSchema } from "../utils/validator/schema/authSchema";

const AuthRoutes = Router();

// POST | /register
AuthRoutes.post(
  "/register",
  (req: Request, res: Response, next: NextFunction) => {
    runValidation(req, res, next, registerSchema);
  },
  AuthController.register
);
// POST | /login
AuthRoutes.post(
  "/login",
  (req: Request, res: Response, next: NextFunction) => {
    runValidation(req, res, next, loginSchema);
  },
  AuthController.login
);

export default AuthRoutes;
