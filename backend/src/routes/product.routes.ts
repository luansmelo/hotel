import { Request, Response, Router, NextFunction } from "express";
import { makeProductController } from "../factories/makeProductController";
import { validate } from "../middlewares/validate";
import {
  AddInputToProductSchema,
  ProductSchema,
} from "../validators/product.validation";
import {
  AddInputToProduct,
  ProductInput,
  ProductInputRemove,
} from "../dto/product.dto";
import { authenticated } from "../middlewares/authenticated";
import { allowed } from "../middlewares/allowed";
import { ROLE } from "../config/constants";

const router = Router();
const slug = "/product";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
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
  allowed([ROLE.Admin, ROLE.User]),
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
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
      const result = await controller.getPredefinedProduct(id);

      return response.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  ":id",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
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
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
      const result = await controller.deleteById(id);
      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add/input/",
  authenticated,
  allowed([ROLE.Admin]),
  validate(AddInputToProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: AddInputToProduct = AddInputToProductSchema.parse(
        request.body
      ) as AddInputToProduct;

      const controller = makeProductController();
      await controller.addInputToProduct(input);

      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:productId/input/:inputId",
  authenticated,
  allowed([ROLE.Admin]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: ProductInputRemove = {
        productId: request.params.productId,
        inputId: request.params.inputId,
      };

      const controller = makeProductController();
      await controller.removeInputFromProduct(input);

      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  authenticated,
  allowed([ROLE.Admin]),
  async (request, response, next) => {
    try {
      const id = request.params.id;
      const controller = makeProductController();
      await controller.updatePredefinedProduct(id, request.body);
      return response.status(200).send({ message: "sucesso" });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
