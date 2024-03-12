import { Request, Response, Router, NextFunction } from "express";
import {
  AddInputToProductSchema,
  ProductSchema,
} from "@/validators/ProductValidation";
import { ROLE } from "@/config/constants";

import { CreateProductModel } from "@/entities/product/createProduct";
import {
  makeCreateProductController,
  makeFindPredefinedProductByIdController,
  makeAddInputToProductController,
  makeFindProductsController,
  makeUpdateProductController,
  makeFindProductByIdController,
  makeDeleteProductController,
} from "@/factories/product/";

import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { allowed, authenticated, validate } from "@/middlewares";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { makeDeleteInputToProductController } from "@/factories/product/DeleteInputToProductByIdFactory";

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
      const controller = makeFindProductsController();
      const result = await controller.findAll();

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
  "/:id",
  authenticated,
  allowed([ROLE.Admin, ROLE.User]),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      const controller = makeFindProductByIdController();
      const result = await controller.findById(id);

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
      const controller = makeDeleteProductController();

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
      const input: RemoveInputToProductModel = {
        productId: request.params.productId,
        inputId: request.params.inputId,
      };

      const controller = makeDeleteInputToProductController();

      await controller.deleteById(input);

      return response.status(200).send({
        message: "Insumo removido com sucesso",
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
  async (request, response, next) => {
    try {
      const id = request.params.id;
      const controller = makeUpdateProductController();

      await controller.updateById(id, request.body);
      return response.status(200).send({
        message: "Produto atualizado com sucesso",
      });
    } catch (error) {
      next(error);
    }
  }
);

export { router, slug };
