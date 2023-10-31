import { PostgreDataSource } from "../../database/data-source";
import ThreadConsumer from "./ThreadConsumer";

PostgreDataSource.initialize()
  .then(async () => {
    await ThreadConsumer.add();
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
