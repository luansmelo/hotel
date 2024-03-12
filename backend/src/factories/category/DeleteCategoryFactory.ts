import prisma from "@/config/prisma";
import { DeleteCategoryController } from "@/controllers/category/DeleteCategoryController";

import { CategoryRepository } from "@/repositories/category.repository";
import { DeleteCategoryUseCase } from "@/useCase/category/DeleteCategoryUseCase";
import { FindCategoryByIdUseCase } from "@/useCase/category/FindCategoryByIdUseCase";

export function makeDeleteCategoryController(): DeleteCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const deleteCategory = new DeleteCategoryUseCase(repo, findCategoryById);

  return new DeleteCategoryController(deleteCategory);
}
