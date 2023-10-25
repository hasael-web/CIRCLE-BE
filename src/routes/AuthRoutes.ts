import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";

const AuthRoutes = Router();

// POST | /register
AuthRoutes.post("/register", AuthControllers.register);
// POST | /login
AuthRoutes.post("/login", AuthControllers.login);

export default AuthRoutes;
