import { CreateProductController } from "@/presentation/controllers/products/CreateProductController";
import { CreateProductUseCase } from "@/data/usecases/product/CreateProductUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";
import { makeProductValidationFactory } from "./ProductValidationFactory";

export function makeCreateProductController(): CreateProductController {
  const repo = new ProductRepository();

  const createProduct = new CreateProductUseCase(repo, repo);

  return new CreateProductController(createProduct, makeProductValidationFactory());
}
