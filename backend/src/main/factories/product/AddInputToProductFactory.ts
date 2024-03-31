import prisma from "@/config/prisma";

import { AddInputToProductController } from "@/presentation/controllers/products/AddInputToProductController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { AddInputToProductUseCase } from "@/data/usecases/product/AddInputToProductUseCase";
import { FindPredefinedProductByIdUseCase } from "@/data/usecases/product/FindPredefinedProductUseCase";

export function makeAddInputToProductController(): AddInputToProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindPredefinedProductByIdUseCase(repo);

  const createProduct = new AddInputToProductUseCase(repo, findProductById);

  return new AddInputToProductController(createProduct);
}
