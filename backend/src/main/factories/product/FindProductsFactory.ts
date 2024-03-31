import prisma from "@/config/prisma";

import { FindProductsController } from "@/presentation/controllers/products/FindProductsController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { FindProductsUseCase } from "@/data/usecases/product/FindProductsUseCase";

export function makeFindProductsController(): FindProductsController {
  const repo = new ProductRepository(prisma);

  const findProduct = new FindProductsUseCase(repo);

  return new FindProductsController(findProduct);
}
