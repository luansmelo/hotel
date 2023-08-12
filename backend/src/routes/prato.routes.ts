import { Request, Response, Router, NextFunction } from "express";
import { AddInsumoToDish, PratoDTO } from "../dto/prato.dto";
import { makePratoController } from "../utils/factories/makePratoController";

const router = Router();
const slug = "/prato";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: PratoDTO = request.body;

      const controller = makePratoController();
      const result = await controller.createDish(payload);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/:dishId/:insumoId/:quantidade",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: AddInsumoToDish = request.body;

      const controller = makePratoController();
      const result = await controller.addInsumoToDish(payload);

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
      const controller = makePratoController();
      const result = await controller.getDishs();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
