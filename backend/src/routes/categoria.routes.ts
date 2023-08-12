import { Request, Response, Router, NextFunction } from "express";
import { CategoryDTO } from "../dto/categoria.dto";
import { makeCategoryController } from "../utils/factories/makeCategoriaController";

const router = Router();
const slug = "/categoria";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const payload: CategoryDTO = request.body;
      const controller = makeCategoryController();
      const result = await controller.createCategory(payload);

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
      const controller = makeCategoryController();
      const result = await controller.getCategory();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
