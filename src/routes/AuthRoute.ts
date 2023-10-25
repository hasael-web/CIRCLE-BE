import { Router } from "express";
import AuthController from "../controllers/AuthController";

const AuthRoutes = Router();

// POST | /register
AuthRoutes.post("/register", AuthController.register);
// POST | /login
AuthRoutes.post("/login", AuthController.login);

export default AuthRoutes;
