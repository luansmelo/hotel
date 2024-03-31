import { FindProductsController } from "@/presentation/controllers/products/FindProductsController";
import { FindProductsUseCase } from "@/data/usecases/product/FindProductsUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeFindProductsController(): FindProductsController {
  const repo = new ProductRepository();

  const findProduct = new FindProductsUseCase(repo);

  return new FindProductsController(findProduct);
}
