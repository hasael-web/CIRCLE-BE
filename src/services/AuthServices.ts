import { Repository } from "typeorm";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { PostgreDataSource } from "../../database/data-source";
import { User } from "../../database/entities/User";
import handleError from "../utils/exception/handleError";
import ConflictError from "../utils/exception/custom/ConflictError";
import BadRequestError from "../utils/exception/custom/BadRequestError";
import Env from "../utils/variables/Env";

export default new (class AuthServices {
  private readonly UserRepository: Repository<User> =
    PostgreDataSource.getRepository(User);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { fullName, email, password } = req.body;

      // CHECK EMAIL
      const checkEmail = await this.UserRepository.findOne({
        where: {
          email,
        },
      });

      if (checkEmail) {
        throw new ConflictError(
          `Email ${email} already registered`,
          "Register Failed"
        );
      }
      // CHECK EMAIL

      const passwordHashed = await bcrypt.hash(password, 10);

      const user = new User();
      user.id = uuidv4();
      user.username = `user_${user.id.slice(0, 8)}_${_.random(1, 100000)}`;
      user.fullname = fullName;
      user.email = email;
      user.password = passwordHashed;
      user.profile_picture =
        "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png";
      await this.UserRepository.save(user);

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Register Success",
      });
    } catch (error) {
      return handleError(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { emailOrUsername, password } = req.body;

      // CHECK USERNAME / EMAIL
      const userSelected = await this.UserRepository.findOne({
        where: [{ email: emailOrUsername }, { username: emailOrUsername }],
      });

      if (!userSelected) {
        throw new BadRequestError(
          `Email/Username or Password wrong`,
          "Login Failed"
        );
      }
      // CHECK USERNAME / EMAIL

      // CHECK PASSWORD
      const isPasswordValid = await bcrypt.compare(
        password,
        userSelected.password
      );

      if (!isPasswordValid) {
        throw new BadRequestError(
          `Email/Username or Password wrong`,
          "Login Failed"
        );
      }
      // CHECK PASSWORD

      const token = jwt.sign({ id: userSelected.id }, Env.JWT_SECRET, {
        expiresIn: 604800,
      });

      return res.status(201).json({
        code: 201,
        status: "success",
        message: "Login Success",
        token,
      });
    } catch (error) {
      return handleError(res, error);
    }
  }
})();
