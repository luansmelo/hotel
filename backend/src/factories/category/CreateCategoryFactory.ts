

import { CreateCategoryController } from "@/controllers/category/CreateCategoryController";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { CreateCategoryUseCase } from "@/useCase/category/CreateCategoryUseCase";
import { FindCategoryByNameUseCase } from "@/useCase/category/FindCategoryByNameUseCase";
import { makeCategoryValidationFactory } from "./CategoryValidationFactory";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository();

  const findCategoryByName = new FindCategoryByNameUseCase(repo);

  const createCategory = new CreateCategoryUseCase(repo, findCategoryByName);

  const validator = makeCategoryValidationFactory()

  return new CreateCategoryController(createCategory, validator);
}
