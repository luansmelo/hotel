import { Request, Response, Router, NextFunction } from "express";
import { makeMenuController } from "../utils/factories/makeMenuController";
import { AddProductToMenuDTO, MenuDTO } from "../dto/menu.dto";

const router = Router();
const slug = "/menu";

router.post(
  "/create",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: MenuDTO = request.body;
      const controller = makeMenuController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/all",
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

router.post(
  "/add/product",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddProductToMenuDTO = request.body;

      const controller = makeMenuController();
      await controller.addProductToMenu(input);

      return response.status(200).send({ message: "Prato adicionado" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
