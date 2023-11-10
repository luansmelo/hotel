import { Request, Response, Router, NextFunction } from "express";
import {
  ProductToCategoryDTO,
  CategoryDTO,
  CategorySchema,
  ProductToCategorySchema,
} from "../dto/category.dto";
import { makeCategoryController } from "../utils/factories/makeCategoryController";
import { validate } from "../middleware/validate";

const router = Router();
const slug = "/category";

router.post(
  "/create",
  validate(CategorySchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CategoryDTO = CategorySchema.parse(request.body);
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
  validate(ProductToCategorySchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductToCategoryDTO = ProductToCategorySchema.parse(
        request.body
      );
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
  validate(ProductToCategorySchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductToCategoryDTO = ProductToCategorySchema.parse(
        request.body
      );
      const controller = makeCategoryController();
      await controller.deleteProduct(input);

      return response.status(200).send({ message: "Produto excluído!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
