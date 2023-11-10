import { Request, Response, Router, NextFunction } from "express";
import { ProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";
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
      const input: ProductToCategoryDTO = request.body;
      const controller = makeCategoryController();
      await controller.addProductToCategory(input);

      return response.status(201).send({ message: "Produto adicionado!" });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeCategoryController();
      const result = await controller.getById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductToCategoryDTO = request.body;
      const controller = makeCategoryController();
      await controller.deleteProduct(input);

      return response.status(200).send({ message: "Produto excluído!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
