import { CategoryController } from "../../controllers/category.controller";
import { CategoryRepository } from "../../repositories/category.repository";
import { CategoryService } from "../../services/category.service";

export function makeCategoryController(): CategoryController {
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(categoryService);
  return categoryController;
}
