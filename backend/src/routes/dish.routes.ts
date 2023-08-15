import { Request, Response, Router, NextFunction } from "express";
import { AddInputToDish, DishDTO } from "../dto/dish.dto";
import { makeDishController } from "../utils/factories/makeDishController";

const router = Router();
const slug = "/dish";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: DishDTO = request.body;

      const controller = makeDishController();
      const result = await controller.createDish(payload);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:dishId/ingredients/:inputId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { dishId, inputId } = request.params;
      const unit = Number(request.query.unit);
      
      const payload: AddInputToDish = {
        dishId,
        inputId,
        unit_measurement: unit,
      };

      const controller = makeDishController();
      const result = await controller.AddInputToDish(payload);

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
      const controller = makeDishController();
      const result = await controller.getDishs();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:dishId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { dishId } = request.params;
      const controller = makeDishController();
      const result = await controller.getDishWithIngredients(dishId);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
