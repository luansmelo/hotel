
import { FindCategoriesController } from "@/presentation/controllers/category/FindCategoriesController";
import { CategoryRepository } from "@/infra/db/mysql/CategoryRepository"; 
import { FindCategoriesUseCase } from "@/data/usecases/category/FindCategoriesUseCase";
import { SortCategoriesValidator } from "@/validators/sort/SortCategoriesValidator";
import { ValidationComposite } from "@/validators/ValidationComposition";

export function makeFindCategoriesController(): FindCategoriesController {
  const repo = new CategoryRepository();

  const categories = new FindCategoriesUseCase(repo);

  const validation = new SortCategoriesValidator();

  const composition = new ValidationComposite([validation]);

  return new FindCategoriesController(categories, composition);
}
