import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import Env from "../variables/Env";

export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<UploadApiResponse | undefined> => {
  cloudinary.config({
    cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    api_key: Env.CLOUDINARY_API_KEY,
    api_secret: Env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    const opt = { folder: "circle" };

    cloudinary.uploader.upload(file.path, opt, function (error, result) {
      if (error) {
        return reject(error);
      }

      return resolve(result);
    });
  });
};

export const deleteUnusedFromCloudinary = (publicsId: string[]): void => {
  cloudinary.config({
    cloud_name: Env.CLOUDINARY_CLOUD_NAME,
    api_key: Env.CLOUDINARY_API_KEY,
    api_secret: Env.CLOUDINARY_API_SECRET,
  });

  publicsId.forEach((publicId) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(`Error deleting public ID ${publicId}:`, error);
      } else {
        console.log(`Deleted public ID ${publicId}:`, result);
      }
    });
  });
};
