import { Router } from "express";

import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindCategoriesController,
  makeUpdateCategoryController,
  makeFindCategoryByIdController,
} from "@/factories/category";

import { adaptRoute } from "@/adapters";

export default (router: Router): void => {
  const categoryRouter = Router();

  categoryRouter.get("/", adaptRoute(makeFindCategoriesController()));
  categoryRouter.get("/:id", adaptRoute(makeFindCategoryByIdController()));

  // Admin Routes
  categoryRouter.post("/create", adaptRoute(makeCreateCategoryController()));
  categoryRouter.delete("/:id", adaptRoute(makeDeleteCategoryController()));
  categoryRouter.put("/:id", adaptRoute(makeUpdateCategoryController()));

  router.use('/category', categoryRouter);
}



