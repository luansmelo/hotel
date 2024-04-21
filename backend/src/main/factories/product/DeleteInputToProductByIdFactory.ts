import { DeleteInputToProductController } from "@/presentation/controllers/products/DeleteInputToProductController";
import { DeleteInputToProductUseCase } from "@/data/usecases/product/DeleteInputToProduct";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeDeleteInputToProductController(): DeleteInputToProductController {
  const repo = new ProductRepository();

  const deleteProduct = new DeleteInputToProductUseCase(repo, repo, repo);

  return new DeleteInputToProductController(deleteProduct);
}
