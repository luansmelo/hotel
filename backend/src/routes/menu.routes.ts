import { Request, Response, Router, NextFunction } from "express";
import { makeMenuController } from "../utils/factories/makeMenuController";
import {
  AddCategoryToMenuDTO,
  AddCategoryToMenuSchema,
  MenuDTO,
  MenuProductDTO,
  MenuSchema,
} from "../dto/menu.dto";
import { validate } from "../middleware/validate";
import { authenticated } from "../middleware/authenticated";

const router = Router();
const slug = "/menu";

router.post(
  "/create",
  authenticated,
  validate(MenuSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuDTO = MenuSchema.parse(request.body) as MenuDTO;
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
  validate(AddCategoryToMenuSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddCategoryToMenuDTO = AddCategoryToMenuSchema.parse(
        request.body
      ) as AddCategoryToMenuDTO;

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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuProductDTO = {
        menuId: request.query.menu as string,
        categoryId: request.query.category as string,
        day: request.query.day as string,
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
