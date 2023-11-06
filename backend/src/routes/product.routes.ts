import { Request, Response, Router, NextFunction } from "express";
import { ProductDTO } from "../dto/product.dto";
import { makeProductController } from "../utils/factories/makeProductController";

const router = Router();
const slug = "/product";

router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductDTO = request.body;
      const controller = makeProductController();
      const result = await controller.create(input);

      return response.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeProductController();
      const result = await controller.getAll();

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
