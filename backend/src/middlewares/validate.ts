import { NextFunction, Request, Response } from "express";
import { z } from "zod";

function validate(schema: z.ZodObject<any, any, any, any>) {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      response.status(400).json({
        errors: (error as z.ZodError).errors.map((err) => ({
          code: err.code,
          message: err.message,
        })),
      });
    }
  };
}

export { validate };
