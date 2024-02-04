import { Request as ExpressRequest, Response, NextFunction } from "express";

export enum Role {
  User = "USER",
  Admin = "ADMIN",
}

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    role: Role;
  };
}

export function allowed(roles: Role[]) {
  return (
    request: AuthenticatedRequest,
    response: Response,
    next: NextFunction
  ) => {
    const { user } = request;
    if (user && roles.includes(user.role)) return next();
    return response.status(403).json({ message: "Forbidden" });
  };
}
