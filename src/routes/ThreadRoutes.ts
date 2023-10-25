import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import { jwtAuth } from "../middlewares/jwtAuth";

const ThreadRoutes = Router();

// POST | /thread
ThreadRoutes.post("/thread", jwtAuth, ThreadController.add);
// GET | /threads
ThreadRoutes.get("/threads", ThreadController.findAll);
// GET | /thread/:id
ThreadRoutes.get("/thread/:id", ThreadController.findOne);
// PUT | /thread/:id
ThreadRoutes.put("/thread/:id", jwtAuth, ThreadController.updateOne);
// DELETE | /thread/:id
ThreadRoutes.delete("/thread/:id", jwtAuth, ThreadController.deleteOne);

export default ThreadRoutes;
