import { PostgreDataSource } from "../database/data-source";
import createServer from "./server/createServer";
import { redisConnect } from "./cache/redis";
import Env from "./utils/variables/Env";

PostgreDataSource.initialize()
  .then(async () => {
    createServer.listen(Env.PORT, () => {
      redisConnect();

      console.log("Success connect to server  ");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
