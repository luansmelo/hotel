import { FindPredefinedProductByIdController } from "@/presentation/controllers/products/FindPredefinedProductByIdController";

import { FindPredefinedProductByIdUseCase } from "@/data/usecases/product/FindPredefinedProductUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeFindPredefinedProductByIdController(): FindPredefinedProductByIdController {
  const repo = new ProductRepository();

  const product = new FindPredefinedProductByIdUseCase(repo);

  return new FindPredefinedProductByIdController(product);
}
