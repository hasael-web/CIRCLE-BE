import "reflect-metadata";
import { DataSource } from "typeorm";
import Env from "../src/utils/variables/Env";
import { User } from "./entities/User";
import { Thread } from "./entities/Thread";
import { Reply } from "./entities/Reply";
import { Like } from "./entities/Like";
import { Upload } from "./entities/Upload";
import { MigrationFile1699409535487 } from "./migration/1699409535487-MigrationFile";

export const PostgreDataSource = new DataSource({
  type: "mysql",
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USERNAME,
  password: "",
  database: Env.DB_NAME,
  entities: [User, Thread, Reply, Like, Upload],
  migrations: [MigrationFile1699409535487],
  subscribers: [],
});
