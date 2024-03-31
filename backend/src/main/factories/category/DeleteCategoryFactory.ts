
import { DeleteCategoryController } from "@/presentation/controllers/category/DeleteCategoryController";
import { DeleteCategoryUseCase } from "@/data/usecases/category/DeleteCategoryUseCase";
import { CategoryRepository } from "@/infra/db/mysql/category/CategoryRepository";

export function makeDeleteCategoryController(): DeleteCategoryController {
  const repo = new CategoryRepository();

  const deleteCategory = new DeleteCategoryUseCase(repo, repo);

  return new DeleteCategoryController(deleteCategory);
}
