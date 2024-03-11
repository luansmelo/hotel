import prisma from "@/config/prisma";
import { AddInputToProductController } from "@/controllers/products/AddInputToProductController";
import { InputRepository } from "@/repositories/input.repository";

import { ProductRepository } from "@/repositories/product.repository";
import { FindInputsByIdUseCase } from "@/useCase/input/FindInputsByIdUseCase";
import { AddInputToProductUseCase } from "@/useCase/product/AddInputToProductUseCase";
import { FindPredefinedProductByIdUseCase } from "@/useCase/product/FindPredefinedProductUseCase";

export function makeAddInputToProductController(): AddInputToProductController {
  const repo = new ProductRepository(prisma);
  const inputRepo = new InputRepository(prisma);

  const findProductById = new FindPredefinedProductByIdUseCase(repo);

  const createProduct = new AddInputToProductUseCase(repo, findProductById);

  return new AddInputToProductController(createProduct);
}
