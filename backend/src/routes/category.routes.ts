import { Request, Response, Router, NextFunction } from "express";
import {
  ProductToCategoryInput,
  CategoryInput,
  ProductCategoryInput,
} from "../dto/category.dto";
import { makeCategoryController } from "../utils/factories/makeCategoryController";
import { validate } from "../middleware/validate";
import { authenticated } from "../middleware/authenticated";
import {
  CategorySchema,
  ProductToCategorySchema,
} from "../validation/category.validation";
import { allowed } from "../middleware/allowed";
import { ROLE } from "../config/constants";

const router = Router();
const slug = "/category";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(CategorySchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CategoryInput = CategorySchema.parse(
        request.body
      ) as CategoryInput;
      const controller = makeCategoryController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeCategoryController();
      const result = await controller.getAll();
      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/product",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductCategoryInput = request.body;

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
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
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
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const controller = makeCategoryController();
      await controller.deleteById(id);

      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next();
    }
  }
);

router.delete(
  "/",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductToCategoryInput = ProductToCategorySchema.parse({
        id: request.query.menu as string,
        categoryId: request.query.category as string,
        productId: request.query.product as string,
        weekDay: request.query.day as string,
      }) as ProductToCategoryInput;

      const controller = makeCategoryController();
      await controller.deleteProduct(input);

      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const input = request.body;
      const controller = makeCategoryController();
      await controller.updateById(id, input);
      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
