import { Router } from "express";
import UploadControllers from "../controllers/UploadControllers";
import { uploadImage } from "../middlewares/uploadImage";

const UploadRoutes = Router();

// POST | /upload
UploadRoutes.post("/upload", uploadImage, UploadControllers.uploadToCloudinary);

export default UploadRoutes;
