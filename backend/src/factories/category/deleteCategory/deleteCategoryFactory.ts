import prisma from "@/config/prisma";

import { DeleteCategoryController } from "@/controllers/category/deleteCategory/deleteCategoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { DeleteCategoryUseCase } from "@/useCase/category/deleteCategory/deleteCategory";
import { FindCategoryByIdUseCase } from "@/useCase/category/findCategoryById/findCategoryById";

export function makeDeleteCategoryController(): DeleteCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const deleteCategory = new DeleteCategoryUseCase(repo, findCategoryById);

  return new DeleteCategoryController(deleteCategory);
}
