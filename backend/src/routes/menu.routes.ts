import { Request, Response, Router, NextFunction } from "express";
import { ROLE } from "@/config/constants";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { MenuSchema } from "@/validators/MenuValidation";
import {
  makeCreateMenuController,
  makeDeleteMenuController,
  makeUpdateMenuController,
  makeFindMenusController,
  makeFindMenuController,
  makeDeleteProductToMenuController,
  makeFindMenuByIdController,
  makeAddProductToMenuController,
} from "@/factories/menu/";
import { allowed, authenticated, validate } from "@/middlewares";

const router = Router();
const slug = "/menu";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(MenuSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateMenuModel = MenuSchema.parse(
        request.body
      ) as CreateMenuModel;

      const controller = makeCreateMenuController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/production/map",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input = {
        menuId: request.query.menu as string,
        categoryId: request.query.category as string,
        day: request.query.day as string,
      };

      const controller = makeFindMenuController();

      const result = await controller.findMenu(input);

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

      const controller = makeFindMenuByIdController();
      const result = await controller.findById(id);

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
      const controller = makeFindMenusController();

      const result = await controller.findAll();

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

      const controller = makeDeleteProductToMenuController();

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
      const input = request.body;

      const controller = makeAddProductToMenuController();
      const result = await controller.add(input);

      return response.status(201).send(result);
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

      const controller = makeDeleteMenuController();

      await controller.deleteById(id);

      return response.status(200).send({
        message: "Cardápio excluído com sucesso",
      });
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
      const input: CreateMenuModel = request.body;

      const controller = makeUpdateMenuController();

      await controller.updateById(id, input);

      return response.status(200).send({
        message: "Cardápio atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
