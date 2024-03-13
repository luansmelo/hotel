import { Router } from "express";
import {
  makeCreateMenuController,
  makeDeleteMenuController,
  makeUpdateMenuController,
  makeFindMenusController,
  makeFindMenuController,
  makeDeleteProductToMenuController,
  makeFindMenuByIdController,
  makeAddProductToMenuController,
} from "@/factories/menu/";

import { adaptMiddleware } from "@/adapters/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const menuRouter = Router();

  menuRouter.get("/production/map", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenuController()));
  menuRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenuByIdController()));
  menuRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenusController()));

  // Admin Routes
  menuRouter.post("/create", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeCreateMenuController()));
  menuRouter.delete("/:menuId/category/:categoryId/product/:productId/weekDay/:weekDay", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteProductToMenuController()));
  menuRouter.post("/add/product", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddProductToMenuController()));
  menuRouter.delete("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeDeleteMenuController()));
  menuRouter.put("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeUpdateMenuController()));

  router.use('/menu', menuRouter);
}

