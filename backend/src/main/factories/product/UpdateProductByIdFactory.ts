import prisma from "@/config/prisma";

import { UpdateProductController } from "@/presentation/controllers/products/UpdateInputController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { FindProductByIdUseCase } from "@/data/usecases/product/FindProductByIdUseCase";
import { UpdateProductByIdUseCase } from "@/data/usecases/product/UpdateProductByIdUseCase";

export function makeUpdateProductController(): UpdateProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const updateProduct = new UpdateProductByIdUseCase(repo, findProductById);

  return new UpdateProductController(updateProduct);
}
