import prisma from "@/config/prisma";

import { DeleteProductController } from "@/controllers/products/DeleteProductController";
import { ProductRepository } from "@/repositories/ProductRepository";
import { DeleteProductUseCase } from "@/useCase/product/DeleteProductUseCase";
import { FindProductByIdUseCase } from "@/useCase/product/FindProductByIdUseCase";

export function makeDeleteProductController(): DeleteProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const deleteProduct = new DeleteProductUseCase(repo, findProductById);

  return new DeleteProductController(deleteProduct);
}
