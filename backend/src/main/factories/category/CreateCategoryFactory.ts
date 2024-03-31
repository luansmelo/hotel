

import { CreateCategoryController } from "@/presentation/controllers/category/CreateCategoryController";
import { CategoryRepository } from "@/infra/db/mysql/CategoryRepository"; 
import { CreateCategoryUseCase } from "@/data/usecases/category/CreateCategoryUseCase";
import { FindCategoryByNameUseCase } from "@/data/usecases/category/FindCategoryByNameUseCase";
import { makeCategoryValidationFactory } from "./CategoryValidationFactory";

export function makeCreateCategoryController(): CreateCategoryController {
  const repo = new CategoryRepository();

  const findCategoryByName = new FindCategoryByNameUseCase(repo);

  const createCategory = new CreateCategoryUseCase(repo, findCategoryByName);

  const validator = makeCategoryValidationFactory()

  return new CreateCategoryController(createCategory, validator);
}
