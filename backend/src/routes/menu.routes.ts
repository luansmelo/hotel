import { Request, Response, Router, NextFunction } from "express";
import { makeMenuController } from "../factories/makeMenuController";
import { MenuInput, MenuProductInput, MenuSchema } from "../dto/menu.dto";
import { validate } from "../middlewares/validate";
import { authenticated } from "../middlewares/authenticated";
import { allowed } from "../middlewares/allowed";
import { ROLE } from "../config/constants";
import { ProductCategoryInput } from "../dto/category.dto";

const router = Router();
const slug = "/menu";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
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

router.get(
  "/select/filter",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuProductInput = {
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
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
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
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: string = request.query.day as string;
      const controller = makeMenuController();
      const result = await controller.getAll(input);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:menuId/category/:categoryId/product/:productId/weekDay/:weekDay",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { menuId, categoryId, productId, weekDay } = request.params;

      const input = {
        menuId,
        categoryId,
        productId,
        weekDay,
      };

      const controller = makeMenuController();
      const result = await controller.deleteProduct(input);

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

      const controller = makeMenuController();
      const result = await controller.addProduct(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:menuId",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { menuId } = request.params;

      const controller = makeMenuController();
      await controller.deleteById(menuId);

      return response.status(204).end()
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:menuId",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { menuId } = request.params;
      const { name } = request.body;

      const controller = makeMenuController();

      await controller.update(menuId, name);
      return response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
