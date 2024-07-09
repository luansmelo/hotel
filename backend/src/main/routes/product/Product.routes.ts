import { Router } from "express";
import {
  makeCreateProductController,
  makeFindPredefinedProductByIdController,
  makeAddInputToProductController,
  makeFindProductsController,
  makeUpdateProductController,
  makeFindProductByIdController,
  makeDeleteProductController,
} from "../../factories/product";

import { makeDeleteInputToProductController } from "../../factories/product/DeleteInputToProductByIdFactory";
import { adaptRoute } from "../../adapters/express/ExpressRouteAdapter";
import { adaptMiddleware } from "../../adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../../factories/middlewares/AuthMiddlewareFactory";

import { makeAuthAdminMiddleware } from "../../factories/middlewares/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const productRouter = Router();

  productRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductsController()));
  productRouter.get("/details/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindPredefinedProductByIdController()));
  productRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductByIdController()));

  // Admin Routes
  productRouter.post("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateProductController()));
  productRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteProductController()));
  productRouter.post("/add/ingredient/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeAddInputToProductController()))
  productRouter.delete("/:productId/ingredient/:ingredientId", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteInputToProductController()));
  productRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateProductController()));

  router.use('/product', productRouter);
}
