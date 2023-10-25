import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import ThreadControllers from "../controllers/ThreadControllers";
import LikeControllers from "../controllers/LikeControllers";
import ReplyControllers from "../controllers/ReplyControllers";

const ThreadRoutes = Router();

// POST | /thread
ThreadRoutes.post("/thread", jwtAuth, ThreadControllers.add);
// GET | /threads
ThreadRoutes.get("/threads", ThreadControllers.findAll);
// GET | /thread/:id
ThreadRoutes.get("/thread/:id", ThreadControllers.findOne);
// PUT | /thread/:id
ThreadRoutes.put("/thread/:id", jwtAuth, ThreadControllers.updateOne);
// DELETE | /thread/:id
ThreadRoutes.delete("/thread/:id", jwtAuth, ThreadControllers.deleteOne);
// POST | /thread/:id/like
ThreadRoutes.post("/thread/:id/like", jwtAuth, LikeControllers.like);
// POST | /thread/:id/reply
ThreadRoutes.post("/thread/:id/reply", jwtAuth, ReplyControllers.add);
// PUT | /thread/:id/reply/:replyId
ThreadRoutes.put("/thread/:id/reply/:replyId", jwtAuth, ReplyControllers.updateOne);
// DELETE | /thread/:id/reply/:replyId
ThreadRoutes.delete("/thread/:id/reply/:replyId", jwtAuth, ReplyControllers.deleteOne);

export default ThreadRoutes;
