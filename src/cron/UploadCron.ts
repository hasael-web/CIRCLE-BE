import { Repository } from "typeorm";
import { PostgreDataSource } from "../../database/data-source";
import { Upload } from "../../database/entities/Upload";
import { deleteUnusedFromCloudinary } from "../utils/cloudinary/upload";

export default new (class UploadCron {
  private readonly UploadRepository: Repository<Upload> =
    PostgreDataSource.getRepository(Upload);

  async cleanUnusedCloudinaryFileDaily(): Promise<void> {
    try {
      const uploads: Upload[] = await this.UploadRepository.find();

      // delete unused file from cloudinary
      deleteUnusedFromCloudinary(uploads.map((upload) => upload.cloudinary_id));
      // delete all upload data from database
      await this.UploadRepository.clear();

      console.log("Clean Cloudinary File Success");
    } catch (error) {
      console.log(error);
    }
  }
})();
