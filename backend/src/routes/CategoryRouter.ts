import { Router } from "express";
import { ROLE } from "@/config/constants";
import { CategorySchema } from "@/validators/CategoryValidation";
import { allowed, authenticated, validate } from "@/middlewares";

import {
  makeCreateCategoryController,
  makeDeleteCategoryController,
  makeFindCategoriesController,
  makeUpdateCategoryController,
  makeFindCategoryByIdController,
} from "@/factories/category";

import { adaptRoute } from "@/adapters";

const router = Router();
const slug = "/category";

router.post("/create", authenticated, allowed([ROLE.Admin]), validate(CategorySchema), adaptRoute(makeCreateCategoryController()));
router.get("/", authenticated, allowed([ROLE.Admin, ROLE.User]), adaptRoute(makeFindCategoriesController()));
router.get("/:id", authenticated, allowed([ROLE.Admin, ROLE.User]), adaptRoute(makeFindCategoryByIdController()));
router.delete("/:id", authenticated, allowed([ROLE.Admin]), adaptRoute(makeDeleteCategoryController()));
router.put("/:id", authenticated, allowed([ROLE.Admin]), adaptRoute(makeUpdateCategoryController()));

export { router, slug };
