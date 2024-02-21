import { Request as ExpressRequest, Response, NextFunction } from "express";
import { ROLE } from "@/config/constants";

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    role: ROLE;
  };
}

export function allowed(roles: ROLE[]) {
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
