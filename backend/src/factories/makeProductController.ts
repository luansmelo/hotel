import { ProductController } from "../controllers/product.controller";
import prisma from "../config/prisma";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";

export function makeProductController(): ProductController {
  const repository = new ProductRepository(prisma);
  const service = new ProductService(repository);
  const controller = new ProductController(service);
  return controller;
}
