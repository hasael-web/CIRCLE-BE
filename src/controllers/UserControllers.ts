import { Request, Response } from "express";
import UserServices from "../services/UserServices";

export default new (class UserControllers {
  findAll(req: Request, res: Response) {
    UserServices.findAll(req, res);
  }
  findByParam(req: Request, res: Response) {
    UserServices.findOneByParam(req, res);
  }
  findByJwt(req: Request, res: Response) {
    UserServices.findOneByJwt(req, res);
  }
  getSuggestedUser(req: Request, res: Response) {
    UserServices.getSuggestedUser(req, res);
  }
})();
