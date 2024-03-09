import prisma from "@/config/prisma";

import { UpdateCategoryController } from "@/controllers/category/updateCategory/updateCategoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { FindCategoryByIdUseCase } from "@/useCase/category/findCategoryById/findCategoryById";
import { UpdateCategoryUseCase } from "@/useCase/category/updateCategory/updateCategory";

export function makeUpdateCategoryController(): UpdateCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const updateCategory = new UpdateCategoryUseCase(repo, findCategoryById);

  return new UpdateCategoryController(updateCategory);
}
