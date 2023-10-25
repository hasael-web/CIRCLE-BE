import { Repository } from "typeorm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PostgreDataSource } from "../../database/data-source";
import { Reply } from "../../database/entities/Reply";
import { Thread } from "../../database/entities/Thread";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import NotFoundError from "../utils/exception/custom/NotFoundError";

export default new (class ReplyServices {
  private readonly ReplyRepository: Repository<Reply> =
    PostgreDataSource.getRepository(Reply);
  private readonly ThreadRepository: Repository<Thread> =
    PostgreDataSource.getRepository(Thread);
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(id)) {
        throw new BadRequestError(
          "The sent ID is not a valid UUID format",
          "UUID Error"
        );
      }

      const userSelected: User | null = await this.UserRepository.findOne({
        where: {
          id: res.locals.auth.id,
        },
      });

      if (!userSelected) {
        throw new NotFoundError(
          `User with ID ${res.locals.auth.id} not found`,
          "User Not Found"
        );
      }

      const threadSelected: Thread | null = await this.ThreadRepository.findOne(
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (!threadSelected) {
        throw new NotFoundError(
          `Thread with ID ${res.locals.auth.id} not found`,
          "Thread Not Found"
        );
      }

      const { content, image } = req.body;

      const reply: Reply = new Reply();
      reply.id = uuidv4();
      reply.content = content;
      if (image) reply.image = image;
      reply.user = userSelected;
      reply.thread = threadSelected;
      await this.ReplyRepository.save(reply);

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Add Reply Success",
      });
      // IF NOT YET LIKE
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
