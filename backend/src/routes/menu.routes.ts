import { Request, Response, Router, NextFunction } from "express";
import { makeMenuController } from "../utils/factories/makeMenuController";
import {
  AddCategoryToMenuInput,
  AddCategoryToMenuSchema,
  MenuInput,
  MenuProductInput,
  MenuSchema,
} from "../dto/menu.dto";
import { validate } from "../middleware/validate";
import { authenticated } from "../middleware/authenticated";
import { Weekdays } from "../utils/enums/weekdays";

const router = Router();
const slug = "/menu";

router.post(
  "/create",
  authenticated,
  validate(MenuSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuInput = MenuSchema.parse(request.body) as MenuInput;
      const controller = makeMenuController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/category",
  authenticated,
  validate(AddCategoryToMenuSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddCategoryToMenuInput = AddCategoryToMenuSchema.parse(
        request.body
      ) as AddCategoryToMenuInput;

      const controller = makeMenuController();
      await controller.addCategoryToMenu(input);

      return response.status(200).send({ message: "Categoria adicionada" });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/select/filter",
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuProductInput = {
        menuId: request.query.menu as string,
        categoryId: request.query.category as string,
        day: request.query.day as Weekdays,
      };

      const controller = makeMenuController();
      const result = await controller.getSelectedMenu(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeMenuController();
      const result = await controller.getById(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeMenuController();
      const result = await controller.getAll();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
