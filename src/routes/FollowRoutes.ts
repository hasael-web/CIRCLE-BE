import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import FollowControllers from "../controllers/FollowControllers";

const FollowRoutes = Router();

// POST | /follow/:userId
FollowRoutes.post("/follow/:userId", jwtAuth, FollowControllers.follow);

export default FollowRoutes;
