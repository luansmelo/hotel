import prisma from "@/config/prisma";

import { DeleteInputToProductController } from "@/presentation/controllers/products/DeleteInputToProductController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { DeleteInputToProductUseCase } from "@/data/usecases/product/DeleteInputToProduct";
import { FindProductByIdUseCase } from "@/data/usecases/product/FindProductByIdUseCase";

export function makeDeleteInputToProductController(): DeleteInputToProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const deleteProduct = new DeleteInputToProductUseCase(repo, findProductById);

  return new DeleteInputToProductController(deleteProduct);
}
