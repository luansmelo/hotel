import { LoadProductsRepository } from "@/data/protocols/db/product/LoadProductsRepository.protocol";
import { FindProductsParams, FindProductsResponse } from "@/domain/usecases/product/FindProductsParams";
import { LoadProductsUseCaseContract } from "@/domain/usecases/product/LoadProducts";

export class FindProductsUseCase implements LoadProductsUseCaseContract {
  constructor(private readonly findProduct: LoadProductsRepository) { }

  async loadAll(params: FindProductsParams): Promise<FindProductsResponse> {
    const products = await this.findProduct.loadAll(params);

    return products;
  }
}
