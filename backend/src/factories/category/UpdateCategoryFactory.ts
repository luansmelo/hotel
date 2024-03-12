import prisma from "@/config/prisma";

import { UpdateCategoryController } from "@/controllers/category/UpdateCategoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { FindCategoryByIdUseCase } from "@/useCase/category/FindCategoryByIdUseCase";
import { UpdateCategoryUseCase } from "@/useCase/category/UpdateCategoryUseCase";

export function makeUpdateCategoryController(): UpdateCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const updateCategory = new UpdateCategoryUseCase(repo, findCategoryById);

  return new UpdateCategoryController(updateCategory);
}
