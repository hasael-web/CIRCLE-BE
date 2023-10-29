import { Router } from "express";
import UploadControllers from "../controllers/UploadControllers";
import { uploadImage } from "../middlewares/uploadImage";
import { jwtAuth } from "../middlewares/jwtAuth";

const UploadRoutes = Router();

// POST | /upload
UploadRoutes.post("/upload", jwtAuth, uploadImage, UploadControllers.uploadToCloudinary);

export default UploadRoutes;
