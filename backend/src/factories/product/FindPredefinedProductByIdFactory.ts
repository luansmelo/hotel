import prisma from "@/config/prisma";

import { FindPredefinedProductByIdController } from "@/controllers/products/FindPredefinedProductByIdController";
import { ProductRepository } from "@/repositories/product.repository";
import { FindPredefinedProductByIdUseCase } from "@/useCase/product/FindPredefinedProductUseCase";

export function makeFindPredefinedProductByIdController(): FindPredefinedProductByIdController {
  const repo = new ProductRepository(prisma);

  const product = new FindPredefinedProductByIdUseCase(repo);

  return new FindPredefinedProductByIdController(product);
}
