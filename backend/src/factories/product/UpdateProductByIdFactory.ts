import prisma from "@/config/prisma";

import { UpdateProductController } from "@/controllers/products/UpdateInputController";
import { ProductRepository } from "@/repositories/product.repository";
import { FindProductByIdUseCase } from "@/useCase/product/FindProductByIdUseCase";
import { UpdateProductByIdUseCase } from "@/useCase/product/UpdateProductByIdUseCase";

export function makeUpdateProductController(): UpdateProductController {
  const repo = new ProductRepository(prisma);

  const findProductById = new FindProductByIdUseCase(repo);

  const updateProduct = new UpdateProductByIdUseCase(repo, findProductById);

  return new UpdateProductController(updateProduct);
}
