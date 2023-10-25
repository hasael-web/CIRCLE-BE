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
      const { threadId } = req.params;

      if (
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          threadId
        )
      ) {
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
            id: threadId,
          },
        }
      );

      if (!threadSelected) {
        throw new NotFoundError(
          `Thread with ID ${threadId} not found`,
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

  async updateOne(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId, replyId } = req.params;

      if (
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          threadId
        ) ||
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          replyId
        )
      ) {
        throw new BadRequestError(
          "The sent ID is not a valid UUID format",
          "UUID Error"
        );
      }

      const threadSelected: Thread | null = await this.ThreadRepository.findOne(
        {
          where: {
            id: threadId,
          },
        }
      );

      if (!threadSelected) {
        throw new NotFoundError(
          `Thread with ID ${threadId} not found`,
          "Thread Not Found"
        );
      }

      const reply: Reply | null = await this.ReplyRepository.findOne({
        where: {
          id: replyId,
        },
      });

      if (!reply) {
        throw new NotFoundError(
          `Reply with ID ${replyId} not found`,
          "Reply Not Found"
        );
      }

      const { content } = req.body;

      reply.content = content;
      await this.ReplyRepository.save(reply);

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Update One Reply Success",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    try {
      const { threadId, replyId } = req.params;

      if (
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          threadId
        ) ||
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          replyId
        )
      ) {
        throw new BadRequestError(
          "The sent ID is not a valid UUID format",
          "UUID Error"
        );
      }

      const thread: Thread | null = await this.ThreadRepository.findOne({
        where: {
          id: threadId,
        },
      });

      if (!thread) {
        throw new NotFoundError(
          `Thread with ID ${threadId} not found`,
          "Thread Not Found"
        );
      }

      const reply: Reply | null = await this.ReplyRepository.findOne({
        where: {
          id: replyId,
        },
      });

      if (!reply) {
        throw new NotFoundError(
          `Reply with ID ${replyId} not found`,
          "Reply Not Found"
        );
      }

      await this.ReplyRepository.delete(replyId);

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Delete One Reply Success",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
