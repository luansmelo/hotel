import prisma from "@/config/prisma";

import { FindPredefinedProductByIdController } from "@/presentation/controllers/products/FindPredefinedProductByIdController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { FindPredefinedProductByIdUseCase } from "@/data/usecases/product/FindPredefinedProductUseCase";

export function makeFindPredefinedProductByIdController(): FindPredefinedProductByIdController {
  const repo = new ProductRepository(prisma);

  const product = new FindPredefinedProductByIdUseCase(repo);

  return new FindPredefinedProductByIdController(product);
}
