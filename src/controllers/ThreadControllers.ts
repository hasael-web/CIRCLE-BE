import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";
import runValidation from "../utils/validator/runValidation";
import {
  addThreadSchema,
  updateThreadSchema,
} from "../utils/validator/schema/threadSchema";

export default new (class ThreadControllers {
  add(req: Request, res: Response) {
    if (runValidation(req, res, addThreadSchema) === "VALID") {
      ThreadServices.add(req, res);
    }
  }
  findAll(req: Request, res: Response) {
    ThreadServices.findAll(req, res);
  }
  findOne(req: Request, res: Response) {
    ThreadServices.findOne(req, res);
  }
  updateOne(req: Request, res: Response) {
    if (runValidation(req, res, updateThreadSchema) === "VALID") {
      ThreadServices.updateOne(req, res);
    }
  }
  deleteOne(req: Request, res: Response) {
    ThreadServices.deleteOne(req, res);
  }
})();