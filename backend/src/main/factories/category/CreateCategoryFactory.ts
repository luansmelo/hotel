

import { CreateCategoryController } from "@/presentation/controllers/category/CreateCategoryController";
import { CreateCategoryUseCase } from "@/data/usecases/category/CreateCategoryUseCase";

import { makeCategoryValidationFactory } from "./CategoryValidationFactory";
import { CategoryRepository } from "@/infra/db/mysql/category/CategoryRepository";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository();

  const createCategory = new CreateCategoryUseCase(repo, repo);

  const validator = makeCategoryValidationFactory()

  return new CreateCategoryController(createCategory, validator);
}
