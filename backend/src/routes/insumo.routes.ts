import { Request, Response, Router, NextFunction } from "express";
import { InputDTO } from "../dto/insumo.dto";
import { makeInputController } from "../utils/factories/makeInsumoController";

const router = Router();
const slug = "/insumo";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: InputDTO = request.body;
      const controller = makeInputController();
      const result = await controller.createInput(payload);

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
      const result = await controller.getInputs();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
