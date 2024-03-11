import prisma from "@/config/prisma";

import { FindProductByIdController } from "@/controllers/products/FindProductByIdController";
import { ProductRepository } from "@/repositories/product.repository";
import { FindProductByIdUseCase } from "@/useCase/product/FindProductByIdUseCase";

export function makeFindProductByIdController(): FindProductByIdController {
  const repo = new ProductRepository(prisma);

  const findProduct = new FindProductByIdUseCase(repo);

  return new FindProductByIdController(findProduct);
}
