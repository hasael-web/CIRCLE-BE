import { Request, Response } from "express";
import AuthServices from "../services/AuthServices";

export default new (class ThreadController {
  register(req: Request, res: Response) {
    AuthServices.register(req, res);
  }
  login(req: Request, res: Response) {
    AuthServices.login(req, res);
  }
})();
