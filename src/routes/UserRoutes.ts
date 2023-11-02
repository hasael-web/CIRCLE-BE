import { Router } from "express";
import UserControllers from "../controllers/UserControllers";
import { jwtAuth } from "../middlewares/jwtAuth";

const UserRoutes = Router();

// GET | /users
UserRoutes.get("/users", jwtAuth, UserControllers.findAll);
// GET | /user/profile
UserRoutes.get("/user/profile", jwtAuth, UserControllers.findByJwt);
// PUT | /user/profile
UserRoutes.put("/user/profile", jwtAuth, UserControllers.updateProfile);
// GET | /user
UserRoutes.get("/user/:userId", jwtAuth, UserControllers.findByParam);
// GET | /suggested
UserRoutes.get("/suggested", jwtAuth, UserControllers.getSuggestedUser);
// DELETE | /suggested
UserRoutes.delete("/user", jwtAuth, UserControllers.removeAccount);

export default UserRoutes;
