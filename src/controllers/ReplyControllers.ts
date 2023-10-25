import { Request, Response } from "express";
import ReplyServices from "../services/ReplyServices";
import runValidation from "../utils/validator/runValidation";
import { addReplySchema } from "../utils/validator/schema/replySchema";

export default new (class ReplyControllers {
  add(req: Request, res: Response) {
    if (runValidation(req, res, addReplySchema) === "VALID") {
      ReplyServices.add(req, res);
    }
  }
})();
