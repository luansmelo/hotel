import prisma from "@/config/prisma";
import { FindCategoryByIdController } from "@/controllers/category/FindCategoryByIdController";
import { CategoryRepository } from "@/repositories/category.repository";
import { FindCategoryByIdUseCase } from "@/useCase/category/findCategoryById/findCategoryById";

export function makeFindCategoryByIdController(): FindCategoryByIdController {
  const repo = new CategoryRepository(prisma);

  const categories = new FindCategoryByIdUseCase(repo);

  return new FindCategoryByIdController(categories);
}
