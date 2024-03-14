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

import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";
import { adaptRoute } from "@/adapters";
import { makeAuthAdminMiddleware } from "@/factories/authAdminMiddleware/AuthAdminMiddlewareFactory";

export default (router: Router): void => {
  const menuRouter = Router();

  menuRouter.get("/production/map", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenuController()));
  menuRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenuByIdController()));
  menuRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindMenusController()));

  // Admin Routes
  menuRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateMenuController()));
  menuRouter.delete("/:menuId/category/:categoryId/product/:productId/weekDay/:weekDay", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteProductToMenuController()));
  menuRouter.post("/add/product", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeAddProductToMenuController()));
  menuRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteMenuController()));
  menuRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateMenuController()));

  router.use('/menu', menuRouter);
}

