import prisma from "@/config/prisma";

import { CreateCategoryController } from "@/controllers/category/CreateCategoryController";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { CreateCategoryUseCase } from "@/useCase/category/CreateCategoryUseCase";
import { FindCategoryByNameUseCase } from "@/useCase/category/FindCategoryByNameUseCase";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryByName = new FindCategoryByNameUseCase(repo);

  const createCategory = new CreateCategoryUseCase(repo, findCategoryByName);

  return new CreateCategoryController(createCategory);
}
