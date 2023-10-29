import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import { jwtAuth } from "../middlewares/jwtAuth";

const UserRoutes = Router();

// GET | /users
UserRoutes.get("/users", jwtAuth, UserControllers.findAll);
// GET | /user
UserRoutes.get("/user/jwt", jwtAuth, UserControllers.findByJwt);
// GET | /user
UserRoutes.get("/user/:userId", jwtAuth, UserControllers.findByParam);

export default UserRoutes;