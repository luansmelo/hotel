

import { UpdateCategoryController } from "@/presentation/controllers/category/UpdateCategoryController";
import { CategoryRepository } from "@/infra/db/mysql/CategoryRepository"; 
import { FindCategoryByIdUseCase } from "@/data/usecases/category/FindCategoryByIdUseCase";
import { UpdateCategoryUseCase } from "@/data/usecases/category/UpdateCategoryUseCase";

export function makeUpdateCategoryController(): UpdateCategoryController {
  const repo = new CategoryRepository();

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const updateCategory = new UpdateCategoryUseCase(repo, findCategoryById);

  return new UpdateCategoryController(updateCategory);
}
