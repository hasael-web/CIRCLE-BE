import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import { jwtAuth } from "../middlewares/jwtAuth";

const UserRoutes = Router();

// GET | /users
UserRoutes.get("/users", jwtAuth, UserControllers.findAll);
// GET | /user
UserRoutes.get("/user/profile", jwtAuth, UserControllers.findByJwt);
// GET | /user
UserRoutes.get("/user/:userId", jwtAuth, UserControllers.findByParam);
// GET | /suggested
UserRoutes.get("/suggested", jwtAuth, UserControllers.getSuggestedUser);

export default UserRoutes;
