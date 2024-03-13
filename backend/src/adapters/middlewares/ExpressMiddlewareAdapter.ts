import { HttpRequest } from "@/controllers/protocols/httpRequest";
import { HttpResponse } from "@/controllers/protocols/httpResponse";
import { Middleware } from "@/controllers/protocols/middleware";
import { NextFunction, Request, Response } from "express";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      params: req.params,
    };

    const httpResponse: HttpResponse = await middleware.handle(httpRequest);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      Object.assign(req, httpResponse.body);
      return next();
    }

    return res
      .status(httpResponse.statusCode)
      .json(httpResponse.body as string);
  };
};
