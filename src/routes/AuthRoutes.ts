import { Router } from "express";
import AuthControllers from "../controllers/AuthControllers";
import { jwtAuth } from "../middlewares/jwtAuth";

const AuthRoutes = Router();

// POST | /register
AuthRoutes.post("/register", AuthControllers.register);
// POST | /login
AuthRoutes.post("/login", AuthControllers.login);
// GET | /check
AuthRoutes.get("/check", jwtAuth, AuthControllers.check);

export default AuthRoutes;
