
import { FindCategoryByIdController } from "@/controllers/category/FindCategoryByIdController";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { FindCategoryByIdUseCase } from "@/useCase/category/FindCategoryByIdUseCase";

export function makeFindCategoryByIdController(): FindCategoryByIdController {
  const repo = new CategoryRepository();

  const categories = new FindCategoryByIdUseCase(repo);

  return new FindCategoryByIdController(categories);
}
