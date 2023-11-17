import { Request, Response, Router, NextFunction } from "express";
import { makeProductController } from "../utils/factories/makeProductController";
import { validate } from "../middleware/validate";
import {
  AddInputToProductSchema,
  ProductSchema,
} from "../validation/product.validation";
import { AddInputToProduct, ProductInput } from "../dto/product.dto";
import { authenticated } from "../middleware/authenticated";

const router = Router();
const slug = "/product";

router.post(
  "/create",
  authenticated,
  validate(ProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductInput = ProductSchema.parse(
        request.body
      ) as ProductInput;
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
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controller = makeProductController();
      const result = await controller.getAll();

      return response.status(200).send({ data: result });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/details/:id",
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
      const result = await controller.getPredefinedProduct(id);
      console.log(result);
      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  ":id",
  authenticated,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
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
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
      const result = await controller.deleteById(id);
      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/input/",
  authenticated,
  validate(AddInputToProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddInputToProduct = AddInputToProductSchema.parse(
        request.body
      ) as AddInputToProduct;

      const controller = makeProductController();
      await controller.addInputToProduct(input);

      return response.status(200).send({ message: "Insumo adicionado!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
