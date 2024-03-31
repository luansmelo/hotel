import prisma from "@/config/prisma";

import { FindProductByIdController } from "@/presentation/controllers/products/FindProductByIdController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { FindProductByIdUseCase } from "@/data/usecases/product/FindProductByIdUseCase";

export function makeFindProductByIdController(): FindProductByIdController {
  const repo = new ProductRepository(prisma);

  const findProduct = new FindProductByIdUseCase(repo);

  return new FindProductByIdController(findProduct);
}
