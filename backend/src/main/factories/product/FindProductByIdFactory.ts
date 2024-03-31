import { FindProductByIdController } from "@/presentation/controllers/products/FindProductByIdController";
import { FindProductByIdUseCase } from "@/data/usecases/product/FindProductByIdUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeFindProductByIdController(): FindProductByIdController {
  const repo = new ProductRepository();

  const findProduct = new FindProductByIdUseCase(repo);

  return new FindProductByIdController(findProduct);
}
