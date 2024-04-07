import { FindProductsController } from "@/presentation/controllers/products/FindProductsController";
import { FindProductsUseCase } from "@/data/usecases/product/FindProductsUseCase";
import { ProductRepository } from "@/infra/db/mysql/product/ProductRepository";
import { ValidationComposite } from "@/validation/validators";
import { SortProductValidator } from "@/validation/validators/SortProductsValidator";

export function makeFindProductsController(): FindProductsController {
  const repo = new ProductRepository();

  const findProduct = new FindProductsUseCase(repo);

  const validation = new SortProductValidator();

  const composition = new ValidationComposite([validation]);

  return new FindProductsController(findProduct, composition);
}
