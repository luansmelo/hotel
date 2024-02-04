import { Request, Response, Router, NextFunction } from "express";
import { makeProductController } from "../utils/factories/makeProductController";
import { validate } from "../middleware/validate";
import {
  AddInputToProductSchema,
  ProductSchema,
} from "../validation/product.validation";
import {
  AddInputToProduct,
  ProductInput,
  ProductInputRemove,
} from "../dto/product.dto";
import { authenticated } from "../middleware/authenticated";
import { Role, allowed } from "../middleware/allowed";

const router = Router();
const slug = "/product";

router.post(
  "/create",
  authenticated,
  allowed([Role.Admin]),
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
  allowed([Role.Admin, Role.User]),
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
  allowed([Role.Admin, Role.User]),
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
  allowed([Role.Admin, Role.User]),
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
  allowed([Role.Admin]),
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
  allowed([Role.Admin]),
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
  allowed([Role.Admin]),
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
  allowed([Role.Admin]),
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
