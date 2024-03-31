import { DeleteProductController } from "@/presentation/controllers/products/DeleteProductController";
import { DeleteProductUseCase } from "@/data/usecases/product/DeleteProductUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeDeleteProductController(): DeleteProductController {
  const repo = new ProductRepository();

  const deleteProduct = new DeleteProductUseCase(repo, repo);

  return new DeleteProductController(deleteProduct);
}
