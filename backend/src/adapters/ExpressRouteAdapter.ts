import { Request, Response } from "express";
import { HttpResponse } from "@/controllers/protocols/httpResponse";
import { HttpRequest } from "@/controllers/protocols/httpRequest";
import { Controller } from "@/controllers/protocols/controller";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      headers: req.headers,
      query: req.query,
      body: req.body,

      file: req.file,
      params: req.params,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
