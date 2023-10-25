import { Request, Response } from "express";
import LikeServices from "../services/LikeServices";

export default new (class LikeControllers {
  like(req: Request, res: Response) {
    LikeServices.like(req, res);
  }
})();
