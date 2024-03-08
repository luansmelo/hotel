import { Request, Response, Router, NextFunction } from "express";
import { CategoryInput } from "@/dto/category/category.dto";
import { makeCategoryController } from "@/factories/makeCategoryController";
import { validate } from "@/middlewares/validate";
import { authenticated } from "@/middlewares/authenticated";
import { CategorySchema } from "@/validators/category.validation";
import { allowed } from "@/middlewares/allowed";
import { ROLE } from "@/config/constants";

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
