import { Request, Response } from "express";
import ThreadServices from "../services/ThreadServices";

export default new (class ThreadController {
  add(req: Request, res: Response) {
    ThreadServices.add(req, res);
  }
  findAll(req: Request, res: Response) {
    ThreadServices.findAll(req, res);
  }
  findOne(req: Request, res: Response) {
    ThreadServices.findOne(req, res);
  }
})();
