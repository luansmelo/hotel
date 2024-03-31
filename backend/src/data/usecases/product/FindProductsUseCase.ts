import { LoadProductsRepository } from "@/data/protocols/db/product/LoadProductsRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { LoadProductsUseCaseContract } from "@/domain/usecases/product/LoadProducts";

export class FindProductsUseCase implements LoadProductsUseCaseContract {
  constructor(private readonly findProduct: LoadProductsRepository) { }

  async loadAll(): Promise<ProductModel[]> {
    const products = await this.findProduct.loadAll();

    return products;
  }
}
