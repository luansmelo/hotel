import { AddInputToProductController } from "@/presentation/controllers/products/AddInputToProductController";

import { AddInputToProductUseCase } from "@/data/usecases/product/AddInputToProductUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeAddInputToProductController(): AddInputToProductController {
  const repo = new ProductRepository();

  const createProduct = new AddInputToProductUseCase(repo, repo);

  return new AddInputToProductController(createProduct);
}
