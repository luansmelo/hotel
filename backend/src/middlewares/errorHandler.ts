import { HttpError } from "@/utils/helpers/httpErrors";
import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Ocorreu um erro interno no servidor." });
}

export default errorHandler;
