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
import MulterAdapter from "@/main/adapters/multer/MulterAdapter";
import { makeUploadProductPhotoController } from "@/main/factories/productMedia/UploadProductPhotoFactory";

const uploadMiddleware = new MulterAdapter({
  allowedMimes: ['image/png', 'image/jpeg'],
  notAllowedMessage: 'Only .png, .jpg format allowed!',
  fileSizeLimit: 16 * 1024 * 1024,
  savePath: 'medias/products',
}).getMiddleware();

export default (router: Router): void => {
  const productRouter = Router();

  productRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductsController()));
  productRouter.get("/details/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindPredefinedProductByIdController()));
  productRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindProductByIdController()));

  // Admin Routes
  productRouter.post("/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateProductController()));
  productRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteProductController()));
  productRouter.post("/add/ingredient/", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeAddInputToProductController()))
  productRouter.delete("/remove/:productId/ingredient/:ingredientId", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteInputToProductController()));
  productRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateProductController()));
  productRouter.put("/:productId/profile", adaptMiddleware(makeAuthAdminMiddleware()), uploadMiddleware, adaptRoute(makeUploadProductPhotoController()));
  router.use('/product', productRouter);
}
