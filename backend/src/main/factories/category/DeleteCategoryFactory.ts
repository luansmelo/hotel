
import { DeleteCategoryController } from "@/presentation/controllers/category/DeleteCategoryController";

import { CategoryRepository } from "@/infra/db/mysql/CategoryRepository";
import { DeleteCategoryUseCase } from "@/data/usecases/category/DeleteCategoryUseCase";
import { FindCategoryByIdUseCase } from "@/data/usecases/category/FindCategoryByIdUseCase";

export function makeDeleteCategoryController(): DeleteCategoryController {
  const repo = new CategoryRepository();

  const findCategoryById = new FindCategoryByIdUseCase(repo);

  const deleteCategory = new DeleteCategoryUseCase(repo, findCategoryById);

  return new DeleteCategoryController(deleteCategory);
}
