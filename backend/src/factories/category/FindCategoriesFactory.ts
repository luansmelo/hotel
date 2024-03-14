import prisma from "@/config/prisma";
import { FindCategoriesController } from "@/controllers/category/FindCategoriesController";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { FindCategoriesUseCase } from "@/useCase/category/FindCategoriesUseCase";
import { SortCategoriesValidator } from "@/validators/sort/SortCategoriesValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export function makeFindCategoriesController(): FindCategoriesController {
  const repo = new CategoryRepository(prisma);

  const categories = new FindCategoriesUseCase(repo);

  const validation = new SortCategoriesValidator();

  const composition = new ValidationComposite([validation]);

  return new FindCategoriesController(categories, composition);
}
