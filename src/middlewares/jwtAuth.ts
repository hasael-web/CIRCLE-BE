import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnauthorizedError from "../utils/exception/custom/UnauthorizedError";
import Env from "../utils/variables/Env";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError(`JWT Token Invalid`, "Access Unauthorized");
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const auth = jwt.verify(token, Env.JWT_SECRET);
    req.body.auth = auth;
    next();
  } catch (error) {
    throw new UnauthorizedError(`JWT Token Invalid`, "Access Unauthorized");
  }
}
