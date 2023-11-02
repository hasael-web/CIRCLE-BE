import { Request, Response } from "express";
import UserServices from "../services/UserServices";
import { updateUserSchema } from "../utils/validator/schema/userSchema";
import runValidation from "../utils/validator/runValidation";

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
  removeAccount(req: Request, res: Response) {
    UserServices.removeAccount(req, res);
  }
  updateProfile(req: Request, res: Response) {
    if (runValidation(req, res, updateUserSchema) === "VALID") {
      UserServices.updateProfile(req, res);
    }
  }
})();
