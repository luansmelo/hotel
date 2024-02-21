import { CategoryController } from "../controllers/category.controller";
import prisma from "../config/prisma";
import { CategoryRepository } from "../repositories/category.repository";
import { CategoryService } from "../services/category.service";

export function makeCategoryController(): CategoryController {
  const repository = new CategoryRepository(prisma);
  const service = new CategoryService(repository);
  const controller = new CategoryController(service);
  return controller;
}
