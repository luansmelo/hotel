import { CategoryController } from "../../controllers/categoria.controller";
import { db } from "../../database";
import { CategoryRepository } from "../../repositories/categorias.repository";
import { CategoryService } from "../../services/categoria.service";

export function makeCategoryController(): CategoryController {
  const categoryRepository = new CategoryRepository(db);
  const categoryService = new CategoryService(categoryRepository);
  const categoryController = new CategoryController(categoryService);
  return categoryController;
}
