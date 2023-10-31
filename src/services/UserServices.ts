import { Not, Repository } from "typeorm";
import { Request, Response } from "express";
import { PostgreDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import NotFoundError from "../utils/exception/custom/NotFoundError";
import BadRequestError from "../utils/exception/custom/BadRequestError";

export default new (class ThreadServices {
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      let page =
        typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
      page = page > 1 ? page : 1;

      const users: User[] = await this.UserRepository.find({
        take: 10,
        skip: page * 10 - 10,
        order: {
          created_at: "DESC",
        },
      });

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find All User Success",
        data: users.map((user) => ({
          ...user,
          password: null,
        })),
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findOneByParam(req: Request, res: Response): Promise<Response> {
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

      const user: User | null = await this.UserRepository.findOne({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new NotFoundError(
          `User with ID ${userId} not found`,
          "User Not Found"
        );
      }

      const followings = await this.UserRepository.query(
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=$1",
        [userId]
      );
      const followers = await this.UserRepository.query(
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=$1",
        [userId]
      );

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find One User By Param Success",
        data: {
          ...user,
          password: null,
          followers,
          followings,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async findOneByJwt(req: Request, res: Response): Promise<Response> {
    try {
      const user: User | null = await this.UserRepository.findOne({
        where: {
          id: res.locals.auth.id,
        },
      });

      if (!user) {
        throw new NotFoundError(
          `User with ID ${res.locals.auth.id} not found`,
          "User Not Found"
        );
      }

      const followings = await this.UserRepository.query(
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=$1",
        [res.locals.auth.id]
      );
      const followers = await this.UserRepository.query(
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=$1",
        [res.locals.auth.id]
      );

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find One User By Jwt Success",
        data: {
          ...user,
          password: null,
          followers,
          followings,
        },
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async getSuggestedUser(req: Request, res: Response): Promise<Response> {
    try {
      const suggested: User[] = await this.UserRepository.createQueryBuilder(
        "users"
      )
        .select([
          "users.id",
          "users.fullname",
          "users.username",
          "users.profile_picture",
        ])
        .where({ id: Not(res.locals.auth.id) })
        .orderBy("RANDOM()")
        .limit(5)
        .getMany();

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Get Suggested Success",
        data: suggested,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
