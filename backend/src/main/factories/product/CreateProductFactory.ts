import prisma from "@/config/prisma";

import { CreateProductController } from "@/presentation/controllers/products/CreateProductController";
import { ProductRepository } from "@/infra/db/mysql/ProductRepository";
import { CreateProductUseCase } from "@/data/usecases/product/CreateProductUseCase";
import { FindProductByNameUseCase } from "@/data/usecases/product/FindProductByNameUseCase";

export function makeCreateProductController(): CreateProductController {
  const repo = new ProductRepository(prisma);

  const findProductByName = new FindProductByNameUseCase(repo);

  const createProduct = new CreateProductUseCase(repo, findProductByName);

  return new CreateProductController(createProduct);
}
