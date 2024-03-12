import prisma from "@/config/prisma";

import { CreateProductController } from "@/controllers/products/CreateProductController";
import { ProductRepository } from "@/repositories/ProductRepository";
import { CreateProductUseCase } from "@/useCase/product/CreateProductUseCase";
import { FindProductByNameUseCase } from "@/useCase/product/FindProductByNameUseCase";

export function makeCreateProductController(): CreateProductController {
  const repo = new ProductRepository(prisma);

  const findProductByName = new FindProductByNameUseCase(repo);

  const createProduct = new CreateProductUseCase(repo, findProductByName);

  return new CreateProductController(createProduct);
}
