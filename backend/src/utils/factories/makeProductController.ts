import { ProductController } from "../../controllers/product.controller";
import prisma from "../../database";
import { ProductRepository } from "../../repositories/product.repository";
import { ProductService } from "../../services/product.service";

export function makeProductController(): ProductController {
  const productRepository = new ProductRepository(prisma);
  const productService = new ProductService(productRepository);
  const productController = new ProductController(productService);
  return productController;
}
