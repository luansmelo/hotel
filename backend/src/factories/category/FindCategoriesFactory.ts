import prisma from "@/config/prisma";
import { FindCategoriesController } from "@/controllers/category/FindCategoriesController";
import { CategoryRepository } from "@/repositories/category.repository";
import { FindCategoriesUseCase } from "@/useCase/category/findCategories/findCategories";

export function makeFindCategoriesController(): FindCategoriesController {
  const repo = new CategoryRepository(prisma);

  const categories = new FindCategoriesUseCase(repo);

  return new FindCategoriesController(categories);
}
