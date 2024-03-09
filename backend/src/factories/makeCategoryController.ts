import { CategoryController } from "@/controllers/category/categoryController";
import { CategoryRepository } from "@/repositories/category.repository";
import { CategoryService } from "@/useCase/category/category.service";


export function makeCategoryController(): CategoryController {
  const repository = new CategoryRepository(null);
  const service = new CategoryService(null);
  const controller = new CategoryController(service);
  return controller;
}
