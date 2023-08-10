import { Request, Response, Router, NextFunction } from "express";
import { InsumoDTO } from "../dto/insumo.dto";
import { makeInsumoController } from "../utils/factories/makeInsumoController";

const router = Router();
const slug = "/insumo";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: InsumoDTO = request.body;
      const controller = makeInsumoController();
      const result = await controller.createInsumo(payload);

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
      const controller = makeInsumoController();
      const result = await controller.getInsumo();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
