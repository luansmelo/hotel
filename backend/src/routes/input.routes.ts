import { Request, Response, Router, NextFunction } from "express";
import { InputDTO } from "../dto/input.dto";
import { makeInputController } from "../utils/factories/makeInputController";

const router = Router();
const slug = "/input";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: InputDTO = request.body;
      const controller = makeInputController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeInputController();
      const result = await controller.getAll();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
