import prisma from "@/config/prisma";
import { CreateCategoryController } from "@/controllers/category/createCategory/createCategoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { CreateCategoryUseCase } from "@/useCase/category/createCategory/createCategoryService";
import { FindCategoryByName } from "@/useCase/category/findCategoryByName/findCategoryByIdService";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository(prisma);

  const findCategoryByName = new FindCategoryByName(repo);

  const createCategory = new CreateCategoryUseCase(repo, findCategoryByName);

  return new CreateCategoryController(createCategory);
}
