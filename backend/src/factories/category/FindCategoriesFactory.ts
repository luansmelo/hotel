import prisma from "@/config/prisma";
import { FindCategoriesController } from "@/controllers/category/FindCategoriesController";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { FindCategoriesUseCase } from "@/useCase/category/FindCategoriesUseCase";

export function makeFindCategoriesController(): FindCategoriesController {
  const repo = new CategoryRepository(prisma);

  const categories = new FindCategoriesUseCase(repo);

  return new FindCategoriesController(categories);
}
