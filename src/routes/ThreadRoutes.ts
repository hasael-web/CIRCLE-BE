import { Router } from "express";
import { jwtAuth } from "../middlewares/jwtAuth";
import ThreadControllers from "../controllers/ThreadControllers";
import LikeControllers from "../controllers/LikeControllers";
import ReplyControllers from "../controllers/ReplyControllers";

const ThreadRoutes = Router();

// POST | /thread
ThreadRoutes.post("/thread", jwtAuth, ThreadControllers.add);
// GET | /threads
ThreadRoutes.get("/threads", jwtAuth, ThreadControllers.findAll);
// GET | /thread/:threadId
ThreadRoutes.get("/thread/:threadId", jwtAuth, ThreadControllers.findOne);
// PUT | /thread/:threadId
ThreadRoutes.put("/thread/:threadId", jwtAuth, ThreadControllers.updateOne);
// DELETE | /thread/:threadId
ThreadRoutes.delete("/thread/:threadId", jwtAuth, ThreadControllers.deleteOne);
// POST | /thread/:threadId/like
ThreadRoutes.post("/thread/:threadId/like", jwtAuth, LikeControllers.like);
// POST | /thread/:threadId/reply
ThreadRoutes.post("/thread/:threadId/reply", jwtAuth, ReplyControllers.add);
// PUT | /thread/threadId/reply/:replyId
ThreadRoutes.put("/thread/:threadId/reply/:replyId", jwtAuth, ReplyControllers.updateOne);
// DELETE | /thread/threadId/reply/:replyId
ThreadRoutes.delete("/thread/:threadId/reply/:replyId", jwtAuth, ReplyControllers.deleteOne);

export default ThreadRoutes;
