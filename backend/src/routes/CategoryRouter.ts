import { Router } from "express";

import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindCategoriesController,
  makeUpdateCategoryController,
  makeFindCategoryByIdController,
} from "@/factories/category";

import { adaptRoute } from "@/adapters";
import { makeAuthAdminMiddleware } from "@/factories/authAdminMiddleware/AuthAdminMiddlewareFactory";
import { adaptMiddleware } from "@/controllers/middlewares/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "@/factories/authMiddleware/AuthMiddlewareFactory";

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



