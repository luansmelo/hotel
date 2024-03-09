import prisma from "@/config/prisma";

import { CreateCategoryController } from "@/controllers/category/createCategory/createCategoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { CreateCategoryUseCase } from "@/useCase/category/createCategory/createCategory";
import { FindCategoryByNameUseCase } from "@/useCase/category/findCategoryByName/findCategoryByName";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryByName = new FindCategoryByNameUseCase(repo);

  const createCategory = new CreateCategoryUseCase(repo, findCategoryByName);

  return new CreateCategoryController(createCategory);
}
