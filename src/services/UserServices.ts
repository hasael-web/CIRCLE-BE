import { Not, Repository, ILike } from "typeorm";
import { Request, Response } from "express";
import { PostgreDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import { Upload } from "../../database/entities/Upload";
import handleError from "../utils/exception/handleError";
import NotFoundError from "../utils/exception/custom/NotFoundError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import redisClient, { DEFAULT_EXPIRATION } from "../cache/redis";

export default new (class ThreadServices {
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);
  private readonly UploadRepository: Repository<Upload> =
    PostgreDataSource.getRepository(Upload);

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const { search = "" } = req.query;
      let page =
        typeof req.query.page === "string" ? parseInt(req.query.page, 10) : 1;
      page = page > 1 ? page : 1;

      const users: User[] = await this.UserRepository.find({
        where: [
          { fullname: ILike(`%${search}%`) },
          { username: ILike(`%${search}%`) },
        ],
        take: 10,
        skip: page * 10 - 10,
        order: {
          created_at: "DESC",
        },
      });
      const count: number = await this.UserRepository.count({
        where: [
          { fullname: ILike(`%${search}%`) },
          { username: ILike(`%${search}%`) },
        ],
      });

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Find All User Success",
        data: users.map((user) => ({
          ...user,
          password: null,
        })),
        totalPage: Math.round(count / 10),
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
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=?",
        [userId]
      );
      const followers = await this.UserRepository.query(
        "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=?",
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

      // console.log(user);

      if (!user) {
        throw new NotFoundError(
          `User with ID ${res.locals.auth.id} not found`,
          "User Not Found"
        );
      }

      const cacheFromRedis = await redisClient.get(`profile=${user.id}`);
      if (cacheFromRedis) {
        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Find One User By Jwt Success (Cache)",
          data: JSON.parse(cacheFromRedis),
        });
      } else {
        const followings = await this.UserRepository.query(
          "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=f.following_id WHERE f.follower_id=?",
          [res.locals.auth.id]
        );
        const followers = await this.UserRepository.query(
          "SELECT u.id, u.username, u.fullname, u.profile_picture FROM following as f INNER JOIN users as u ON u.id=follower_id WHERE f.following_id=?",
          [res.locals.auth.id]
        );

        redisClient.setEx(
          `profile=${user.id}`,
          DEFAULT_EXPIRATION,
          JSON.stringify({
            ...user,
            password: null,
            followers,
            followings,
          })
        );

        return res.status(200).json({
          code: 200,
          status: "success",
          message: "Find One User By Jwt Success (Fresh)",
          data: {
            ...user,
            password: null,
            followers,
            followings,
          },
        });
      }
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
        .orderBy("RAND()")
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

  async removeAccount(req: Request, res: Response): Promise<Response> {
    try {
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

      await this.UserRepository.query(
        "DELETE FROM following WHERE following_id=? OR follower_id=?",
        [res.locals.auth.id]
      );

      await this.UserRepository.delete(res.locals.auth.id);

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Remove Account Success",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const { fullName, bio, userName, profilePicture, uploadId } = req.body;

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

      const checkUsername: User | null = await this.UserRepository.findOne({
        where: {
          username: userName,
        },
      });

      if (checkUsername && checkUsername.id !== user.id) {
        throw new NotFoundError(
          `Username ${userName} already used by other user`,
          "Username Already Used"
        );
      }

      user.username = userName;
      user.fullname = fullName;
      user.bio = bio;
      if (profilePicture) {
        user.profile_picture = profilePicture;
      }
      await this.UserRepository.save(user);
      if (uploadId) await this.UploadRepository.delete(uploadId);

      redisClient.del(`profile=${user.id}`);

      return res.status(200).json({
        code: 200,
        status: "success",
        message: "Update Profile Success",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
