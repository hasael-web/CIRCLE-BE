import express, { Express, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import ThreadRoutes from "../routes/ThreadRoutes";
import AuthRoutes from "../routes/AuthRoute";

const createServer: Express = express();

createServer.use(express.json());
createServer.use(helmet());
createServer.use(cors());

createServer.get("/", (req: Request, res: Response): Response<string> => {
  return res.status(200).send("Server Online!");
});

createServer.use("/api/v1", AuthRoutes);
createServer.use("/api/v1", ThreadRoutes);

createServer.use((req: Request, res: Response): Response<string> => {
  return res.status(404).send("404 - Not Found!");
});

export default createServer;
