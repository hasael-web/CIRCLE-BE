import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cron from "node-cron";
import swaggerUi from "swagger-ui-express";
import handleError from "../utils/exception/handleError";
import NotFoundError from "../utils/exception/custom/NotFoundError";

import ThreadRoutes from "../routes/ThreadRoutes";
import AuthRoutes from "../routes/AuthRoutes";
import FollowRoutes from "../routes/FollowRoutes";
import UploadRoutes from "../routes/UploadRoutes";
import UserRoutes from "../routes/UserRoutes";
import UploadCron from "../cron/UploadCron";
import apiSpec from "../utils/swagger/apiSpec";

const createServer: Express = express();

createServer.use(express.json());
createServer.use(helmet());
createServer.use(cors());

createServer.get("/", (req: Request, res: Response): Response<string> => {
  return res.status(200).send("Server Online!");
});

createServer.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

createServer.use("/api/v1", AuthRoutes);
createServer.use("/api/v1", ThreadRoutes);
createServer.use("/api/v1", FollowRoutes);
createServer.use("/api/v1", UploadRoutes);
createServer.use("/api/v1", UserRoutes);

cron.schedule("0 0 * * *", () => {
  // setiap jam 12 malam
  UploadCron.cleanUnusedCloudinaryFileDaily();
});

createServer.use((req: Request, res: Response): Response<string> => {
  return handleError(
    res,
    new NotFoundError("Resource on that url doesn't exist", "Not Found")
  );
});

export default createServer;
