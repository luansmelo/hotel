

import { UpdateCategoryController } from "@/presentation/controllers/category/UpdateCategoryController";
import { UpdateCategoryUseCase } from "@/data/usecases/category/UpdateCategoryUseCase";
import { CategoryRepository } from "@/infra/db/mysql/category/CategoryRepository";
import { LoadCategoryByIdUseCase } from "@/data/usecases/category/LoadCategoryByIdUseCase";

export function makeUpdateCategoryController(): UpdateCategoryController {
  const repo = new CategoryRepository();

  const findCategoryById = new LoadCategoryByIdUseCase(repo);

  const updateCategory = new UpdateCategoryUseCase(repo, findCategoryById);

  return new UpdateCategoryController(updateCategory);
}
