import { Repository } from "typeorm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PostgreDataSource } from "../../database/data-source";
import { Thread } from "../../database/entities/Thread";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import NotFoundError from "../utils/exception/custom/NotFoundError";

export default new (class ThreadServices {
  private readonly ThreadRepository: Repository<Thread> =
    PostgreDataSource.getRepository(Thread);
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const dummyUserId = "2ab42bba-2edc-445e-a9d0-8ae7797e8b34";

      const userSelected: User | null = await this.UserRepository.findOne({
        where: {
          id: dummyUserId,
        },
      });

      if (!userSelected) {
        throw new NotFoundError(
          `User with ID ${dummyUserId} not found`,
          "User Not Found"
        );
      }

      const { content, image } = req.body;

      const thread: Thread = new Thread();
      thread.id = uuidv4();
      thread.content = content;
      thread.image = image;
      thread.user = userSelected;
      await this.ThreadRepository.save(thread);

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Add Thread Success",
        data: thread,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const threads: Thread[] = await this.ThreadRepository.find({
        relations: ["user"],
      });

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find All Thread Success",
        data: threads,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          id
        )
      ) {
        throw new BadRequestError(
          "The sent ID is not a valid UUID format",
          "UUID Error"
        );
      }

      const thread: Thread | null = await this.ThreadRepository.findOne({
        where: {
          id: req.params.id,
        },
        relations: ["user"],
      });

      if (!thread) {
        throw new NotFoundError(
          `Thread with ID ${id} not found`,
          "Thread Not Found"
        );
      }

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find One Thread Success",
        data: thread,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
