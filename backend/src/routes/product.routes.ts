import { Request, Response, Router, NextFunction } from "express";
import {
  AddInputToProductDTO,
  AddInputToProductSchema,
  ProductDTO,
  ProductSchema,
} from "../dto/product.dto";
import { makeProductController } from "../utils/factories/makeProductController";
import { validate } from "../middleware/validate";

const router = Router();
const slug = "/product";

router.post(
  "/create",
  validate(ProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductDTO = ProductSchema.parse(request.body);
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

router.get(
  "/details/:id",
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
  validate(AddInputToProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddInputToProductDTO = AddInputToProductSchema.parse(
        request.body
      );

      const controller = makeProductController();
      await controller.addInputToProduct(input);

      return response.status(200).send({ message: "Insumo adicionado!" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
