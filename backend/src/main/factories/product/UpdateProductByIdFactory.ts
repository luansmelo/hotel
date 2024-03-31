import { UpdateProductController } from "@/presentation/controllers/products/UpdateInputController";
import { UpdateProductByIdUseCase } from "@/data/usecases/product/UpdateProductByIdUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";

export function makeUpdateProductController(): UpdateProductController {
  const repo = new ProductRepository();

  const updateProduct = new UpdateProductByIdUseCase(repo, repo);

  return new UpdateProductController(updateProduct);
}
