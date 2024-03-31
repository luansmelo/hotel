
import { LoadCategoryByIdUseCase } from "@/data/usecases/category/LoadCategoryByIdUseCase";
import { CategoryRepository } from "@/infra/db/mysql/category/CategoryRepository";
import { FindCategoryByIdController } from "@/presentation/controllers/category/FindCategoryByIdController";

export function makeFindCategoryByIdController(): FindCategoryByIdController {
  const repo = new CategoryRepository();

  const categories = new LoadCategoryByIdUseCase(repo);

  return new FindCategoryByIdController(categories);
}
