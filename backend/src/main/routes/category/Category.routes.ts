import { Router } from "express";

import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindCategoriesController,
  makeUpdateCategoryController,
  makeFindCategoryByIdController,
} from "../../factories/category";

import { adaptRoute } from "../../adapters/express/ExpressRouteAdapter";
import { makeAuthAdminMiddleware } from "../../factories/middlewares/AuthAdminMiddlewareFactory";
import { makeAuthMiddleware } from "../../factories/middlewares/AuthMiddlewareFactory";
import { adaptMiddleware } from "../../adapters/middlewares/ExpressMiddlewareAdapter";

export default (router: Router): void => {
  const categoryRouter = Router();

  categoryRouter.get("/", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindCategoriesController()));
  categoryRouter.get("/:id", adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeFindCategoryByIdController()));

  // Admin Routes
  categoryRouter.post("/create", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeCreateCategoryController()));
  categoryRouter.delete("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeDeleteCategoryController()));
  categoryRouter.put("/:id", adaptMiddleware(makeAuthAdminMiddleware()), adaptRoute(makeUpdateCategoryController()));

  router.use('/category', categoryRouter);
}



