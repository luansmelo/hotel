import { Request, Response, Router, NextFunction } from "express";
import { AddProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";
import { makeCategoryController } from "../utils/factories/makeCategoryController";

const router = Router();
const slug = "/category";

router.post(
  "/create",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CategoryDTO = request.body;
      const controller = makeCategoryController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/product",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddProductToCategoryDTO = request.body;
      const controller = makeCategoryController();
      await controller.addProductToCategory(input);

      return response.status(201).send({ message: "Produto adicionado!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
