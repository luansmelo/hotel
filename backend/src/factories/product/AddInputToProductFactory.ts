import prisma from "@/config/prisma";

import { AddInputToProductController } from "@/controllers/products/AddInputToProductController";
import { ProductRepository } from "@/repositories/ProductRepository";
import { AddInputToProductUseCase } from "@/useCase/product/AddInputToProductUseCase";
import { FindPredefinedProductByIdUseCase } from "@/useCase/product/FindPredefinedProductUseCase";

export function makeAddInputToProductController(): AddInputToProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindPredefinedProductByIdUseCase(repo);

  const createProduct = new AddInputToProductUseCase(repo, findProductById);

  return new AddInputToProductController(createProduct);
}
