import { Repository } from "typeorm";
import { Request, Response } from "express";
import { PostgreDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import NotFoundError from "../utils/exception/custom/NotFoundError";
import ConflictError from "../utils/exception/custom/ConflictError";

export default new (class FollowServices {
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async follow(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;

      if (
        !/^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89aAbB][a-f\d]{3}-[a-f\d]{12}$/.test(
          userId
        )
      ) {
        throw new BadRequestError(
          "The sent ID is not a valid UUID format",
          "UUID Error"
        );
      }

      const followingUser: User | null = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!followingUser) {
        throw new NotFoundError(
          `User with ID ${userId} not found`,
          "User Not Found"
        );
      }

      const followerUser: User | null = await this.UserRepository.findOne({
        where: {
          id: res.locals.auth.id,
        },
      });

      if (!followerUser) {
        throw new NotFoundError(
          `User with ID ${res.locals.auth.id} not found`,
          "User Not Found"
        );
      }

      if (followerUser.id === followingUser.id) {
        throw new ConflictError(`You can't follow yourself`, "Follow Failed");
      }

      // CHECK IF ALREADY FOLLOW
      const checkFollow = await this.UserRepository.query(
        "SELECT * FROM following WHERE following_id=$1 AND follower_id=$2",
        [followingUser.id, followerUser.id]
      );
      // CHECK IF ALREADY FOLLOW

      // IF ALREADY FOLLOW
      if (checkFollow.length) {
        await this.UserRepository.query(
          "DELETE FROM following WHERE following_id=$1 AND follower_id=$2",
          [followingUser.id, followerUser.id]
        );

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Undo Follow User Success",
        });
      }
      // IF ALREADY FOLLOW

      // IF NOT YET LIKE
      followingUser.users = [followerUser];
      await this.UserRepository.save(followingUser);

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Follow Success",
      });
      // IF NOT YET LIKE
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
