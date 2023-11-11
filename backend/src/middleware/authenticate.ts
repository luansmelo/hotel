// authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";

const authenticate = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.header("Authorization")?.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET as Secret, (error, user) => {
    if (error) {
      return response.status(403).json({ message: "Forbidden" });
    }

    request.user = user;
    next();
  });
};

export { authenticate };
