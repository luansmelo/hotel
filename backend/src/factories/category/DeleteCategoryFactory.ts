
import { DeleteCategoryController } from "@/controllers/category/DeleteCategoryController";

import { CategoryRepository } from "@/repositories/CategoryRepository";
import { DeleteCategoryUseCase } from "@/useCase/category/DeleteCategoryUseCase";
import { FindCategoryByIdUseCase } from "@/useCase/category/FindCategoryByIdUseCase";

export function makeDeleteCategoryController(): DeleteCategoryController {
  const repo = new CategoryRepository();

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const deleteCategory = new DeleteCategoryUseCase(repo, findCategoryById);

  return new DeleteCategoryController(deleteCategory);
}
