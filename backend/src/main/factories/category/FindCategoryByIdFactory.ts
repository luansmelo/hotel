
import { FindCategoryByIdController } from "@/presentation/controllers/category/FindCategoryByIdController";
import { CategoryRepository } from "@/infra/db/mysql/CategoryRepository"; 
import { FindCategoryByIdUseCase } from "@/data/usecases/category/FindCategoryByIdUseCase";

export function makeFindCategoryByIdController(): FindCategoryByIdController {
  const repo = new CategoryRepository();

  const categories = new FindCategoryByIdUseCase(repo);

  return new FindCategoryByIdController(categories);
}
