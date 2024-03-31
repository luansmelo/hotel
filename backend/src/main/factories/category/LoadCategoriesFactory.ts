
import { LoadCategoriesUseCase } from "@/data/usecases/category/LoadCategoriesUseCase";
import { CategoryRepository } from "@/infra/db/mysql/category/CategoryRepository";
import { FindCategoriesController } from "@/presentation/controllers/category/FindCategoriesController";
import { ValidationComposite } from "@/validation/validators";
import { SortCategoriesValidator } from "@/validation/validators/SortCategoriesValidator";

export function makeFindCategoriesController(): FindCategoriesController {
  const repo = new CategoryRepository();

  const categories = new LoadCategoriesUseCase(repo);

  const validation = new SortCategoriesValidator();

  const composition = new ValidationComposite([validation]);

  return new FindCategoriesController(categories, composition);
}
