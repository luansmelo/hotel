import prisma from "@/config/prisma";

import { FindProductsController } from "@/controllers/products/FindProductsController";
import { ProductRepository } from "@/repositories/product.repository";
import { FindProductsUseCase } from "@/useCase/product/FindProductsUseCase";

export function makeFindProductsController(): FindProductsController {
  const repo = new ProductRepository(prisma);

  const findProduct = new FindProductsUseCase(repo);

  return new FindProductsController(findProduct);
}
