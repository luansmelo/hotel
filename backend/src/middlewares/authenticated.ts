import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@/config/env";
import "dotenv/config";
import { UserDataContract } from "@/dto/user/user.dto";

export function authenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;
  const { secret } = authConfig.jwt;

  if (!authToken) {
    return response.status(401).json({ message: "Token is missing!" });
  }

  const [, token] = authToken.split(" ");

  try {
    const decodedToken = verify(token, secret) as UserDataContract;
    request["user"] = decodedToken;
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Token invalid" });
  }
}
