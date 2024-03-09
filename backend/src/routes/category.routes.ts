import { Request, Response, Router, NextFunction } from "express";
import { ROLE } from "@/config/constants";
import { CategorySchema } from "@/validators/category.validation";
import { allowed, authenticated, validate } from "@/middlewares";
import { CreateCategoryModel } from "@/entities/category/createCategory";
import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindCategoriesController,
  makeUpdateCategoryController,
  makeFindCategoryByIdController,
} from "@/factories/category";

const router = Router();
const slug = "/category";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(CategorySchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateCategoryModel = CategorySchema.parse(
        request.body
      ) as CreateCategoryModel;

      const controller = makeCreateCategoryController();
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
      const controller = makeFindCategoriesController();

      const result = await controller.findAll();

      return response.status(200).send(result);
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
      const controller = makeFindCategoryByIdController();

      const result = await controller.findById(id);

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

      const controller = makeDeleteCategoryController();
      const result = await controller.deleteById(id);

      return response.status(200).send(result);
    } catch (error) {
      next();
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

      const controller = makeUpdateCategoryController();

      const result = await controller.updateById(id, input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
