import amqp from "amqplib";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import Env from "../utils/variables/Env";
import { PostgreDataSource } from "../../database/data-source";
import { Thread } from "../../database/entities/Thread";
import { User } from "../../database/entities/User";
import { Upload } from "../../database/entities/Upload";
import NotFoundError from "../utils/exception/custom/NotFoundError";

export default new (class ThreadConsumer {
  private readonly ThreadRepository: Repository<Thread> =
    PostgreDataSource.getRepository(Thread);
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);
  private readonly UploadRepository: Repository<Upload> =
    PostgreDataSource.getRepository(Upload);

  async add(): Promise<void> {
    try {
      const connection = await amqp.connect(Env.AMQP_SERVER);
      const channel = await connection.createChannel();

      await channel.assertQueue("thread-post-queue", {
        durable: true,
      });

      channel.consume(
        "thread-post-queue",
        async (message) => {
          if (message?.content.toString()) {
            try {
              const { content, image, uploadId, loginId } = JSON.parse(
                message?.content.toString()
              );

              const userSelected: User | null =
                await this.UserRepository.findOne({
                  where: {
                    id: loginId,
                  },
                });

              if (!userSelected) {
                throw new NotFoundError(
                  `User with ID ${loginId} not found`,
                  "User Not Found"
                );
              }

              const thread: Thread = new Thread();
              thread.id = uuidv4();
              thread.content = content;
              if (image) thread.image = image;
              thread.user = userSelected;
              await this.ThreadRepository.save(thread);
              if (uploadId) await this.UploadRepository.delete(uploadId);

              console.log("Add Thread Success");
            } catch (error) {
              console.log(error);
            }
          }
        },
        { noAck: true }
      );
    } catch (error) {
      console.log(error);
    }
  }
})();
