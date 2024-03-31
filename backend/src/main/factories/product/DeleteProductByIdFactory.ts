import prisma from "@/config/prisma";

import { DeleteProductController } from "@/presentation/controllers/products/DeleteProductController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { DeleteProductUseCase } from "@/data/usecases/product/DeleteProductUseCase";
import { FindProductByIdUseCase } from "@/data/usecases/product/FindProductByIdUseCase";

export function makeDeleteProductController(): DeleteProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const deleteProduct = new DeleteProductUseCase(repo, findProductById);

  return new DeleteProductController(deleteProduct);
}
