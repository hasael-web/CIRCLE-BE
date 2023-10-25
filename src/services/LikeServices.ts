import { Repository } from "typeorm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { PostgreDataSource } from "../../database/data-source";
import { Like } from "../../database/entities/Like";
import { Thread } from "../../database/entities/Thread";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import NotFoundError from "../utils/exception/custom/NotFoundError";

export default new (class LikeServices {
  private readonly LikeRepository: Repository<Like> =
    PostgreDataSource.getRepository(Like);
  private readonly ThreadRepository: Repository<Thread> =
    PostgreDataSource.getRepository(Thread);
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async like(req: Request, res: Response): Promise<Response> {
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

      // CHECK LIKE IF EXIST
      const likeSelected: Like | null = await this.LikeRepository.findOne({
        where: {
          user: {
            id: userSelected.id,
          },
          thread: {
            id: threadSelected.id,
          },
        },
      });
      // CHECK LIKE IF EXIST

      // IF ALREADY LIKE
      if (likeSelected) {
        await this.LikeRepository.delete(likeSelected.id);

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Undo Like Thread Success",
        });
      }
      // IF ALREADY LIKE

      // IF NOT YET LIKE
      const like = new Like();
      like.id = uuidv4();
      like.user = userSelected;
      like.thread = threadSelected;
      await this.LikeRepository.save(like);

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Like Thread Success",
      });
      // IF NOT YET LIKE
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
