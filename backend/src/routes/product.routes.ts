import { Request, Response, Router, NextFunction } from "express";
import { makeProductController } from "@/factories/makeProductController";
import { validate } from "@/middlewares/validate";
import {
  AddInputToProductSchema,
  ProductSchema,
} from "@/validators/product.validation";
import {
  AddInputToProduct,
  ProductModel,
  ProductInputRemove,
} from "@/dto/product/product.dto";
import { authenticated } from "@/middlewares/authenticated";
import { allowed } from "@/middlewares/allowed";
import { ROLE } from "@/config/constants";
import { makeCreateProductController } from "@/factories/product/CreateProductFactory";
import { CreateProductModel } from "@/entities/product/createProduct";
import { makeFindPredefinedProductByIdController } from "@/factories/product/FindPredefinedProductByIdFactory";
import { makeAddInputToProductController } from "@/factories/product/AddInputToProductFactory";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

const router = Router();
const slug = "/product";

router.post(
  "/create",
  authenticated,
  allowed([ROLE.Admin]),
  validate(ProductSchema),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const input: CreateProductModel = ProductSchema.parse(
        request.body
      ) as CreateProductModel;

      const controller = makeCreateProductController();
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
      const controller = makeFindPredefinedProductByIdController();
      const result = await controller.findPredefinedById(id);

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
      return response.status(200).end();
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
      const input: AddInputToProductModel = AddInputToProductSchema.parse(
        request.body
      ) as AddInputToProductModel;

      const controller = makeAddInputToProductController();
      await controller.add(input);

      return response.status(200).send({
        message: "Insumo adicionado com sucesso",
      });
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

      return response.status(200).end();
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
      await controller.updateById(id, request.body);
      return response.status(200).end();
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
