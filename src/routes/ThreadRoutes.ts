import { NextFunction, Request, Response, Router } from "express";
import ThreadController from "../controllers/ThreadController";
import runValidation from "../utils/validator/runValidation";
import { addThreadSchema } from "../utils/validator/schema/threadSchema";

const ThreadRoutes = Router();

// POST | /thread
ThreadRoutes.post(
  "/thread",
  (req: Request, res: Response, next: NextFunction) => {
    runValidation(req, res, next, addThreadSchema);
  },
  ThreadController.add
);
// GET | /threads
ThreadRoutes.get("/threads", ThreadController.findAll);
// GET | /thread/:id
ThreadRoutes.get("/thread/:id", ThreadController.findOne);
// PUT | /thread/:id
ThreadRoutes.put(
  "/thread/:id",
  (req: Request, res: Response, next: NextFunction) => {
    runValidation(req, res, next, addThreadSchema);
  },
  ThreadController.updateOne
);
// DELETE | /thread/:id
ThreadRoutes.delete("/thread/:id", ThreadController.deleteOne);

export default ThreadRoutes;
