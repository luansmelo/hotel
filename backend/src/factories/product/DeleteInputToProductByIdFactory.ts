import prisma from "@/config/prisma";

import { DeleteInputToProductController } from "@/controllers/products/DeleteInputToProductController";
import { ProductRepository } from "@/repositories/product.repository";
import { DeleteInputToProductUseCase } from "@/useCase/product/DeleteInputToProduct";
import { FindProductByIdUseCase } from "@/useCase/product/FindProductByIdUseCase";

export function makeDeleteInputToProductController(): DeleteInputToProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const deleteProduct = new DeleteInputToProductUseCase(repo, findProductById);

  return new DeleteInputToProductController(deleteProduct);
}
