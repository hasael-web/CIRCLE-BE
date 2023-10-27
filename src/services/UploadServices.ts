import { Request, Response } from "express";
import { deleteFile } from "../utils/file/fileHelper";
import handleError from "../utils/exception/handleError";
import { uploadToCloudinary } from "../utils/cloudinary/upload";

export default new (class UploadServices {
  async uploadToCloudinary(req: Request, res: Response): Promise<Response> {
    try {
      let image: string | undefined = undefined;
      if (req.file?.filename) {
        image = await uploadToCloudinary(req.file);
        deleteFile(req.file.path);
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Upload Image Success",
        data: {
          url: image,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
