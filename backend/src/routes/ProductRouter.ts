import { Router } from "express";
import {
  makeCreateProductController,
  makeFindPredefinedProductByIdController,
  makeAddInputToProductController,
  makeFindProductsController,
  makeUpdateProductController,
  makeFindProductByIdController,
  makeDeleteProductController,
} from "@/factories/product";

import { makeDeleteInputToProductController } from "@/factories/product/DeleteInputToProductByIdFactory";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/middlewares/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";
import { makeAuthAdminMiddleware } from "@/factories/middlewares/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const productRouter = Router();

  productRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductsController()));
  productRouter.get("/details/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindPredefinedProductByIdController()));
  productRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductByIdController()));

  // Admin Routes
  productRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateProductController()));
  productRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteProductController()));
  productRouter.post("/add/input/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeAddInputToProductController()))
  productRouter.delete("/:productId/input/:inputId", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteInputToProductController()));
  productRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateProductController()));

  router.use('/product', productRouter);
}
