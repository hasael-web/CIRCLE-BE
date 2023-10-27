import { Request, Response } from "express";
import UploadServices from "../services/UploadServices";

export default new (class AuthControllers {
  uploadToCloudinary(req: Request, res: Response) {
    UploadServices.uploadToCloudinary(req, res);
  }
})();
