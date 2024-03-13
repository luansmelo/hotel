import { Router } from "express";
import {
  makeCreateProductController,
  makeFindPredefinedProductByIdController,
  makeAddInputToProductController,
  makeFindProductsController,
  makeUpdateProductController,
  makeFindProductByIdController,
  makeDeleteProductController,
} from "@/factories/product/";

import { makeDeleteInputToProductController } from "@/factories/product/DeleteInputToProductByIdFactory";
import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const productRouter = Router();

  productRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductsController()));
  productRouter.get("/details/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindPredefinedProductByIdController()));
  productRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductByIdController()));

  // Admin Routes
  productRouter.post("/create", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateProductController()));
  productRouter.delete("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteProductController()));
  productRouter.post("/add/input/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddInputToProductController()))
  productRouter.delete("/:productId/input/:inputId", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteInputToProductController()));
  productRouter.put("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateProductController()));

  router.use('/product', productRouter);
}
