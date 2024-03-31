import { LoadPredefinedProductRepository } from "@/data/protocols/db/product/LoadPredefinedProductRepository.protocol";
import { ProductModel } from "@/domain/models/Product";
import { LoadPredefinedProductUseCaseContract } from "@/domain/usecases/product/LoadPredefinedProduct";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class FindPredefinedProductByIdUseCase
  implements LoadPredefinedProductUseCaseContract {
  constructor(
    private readonly findProduct: LoadPredefinedProductRepository
  ) { }

  async loadPredefinedProduct(id: string): Promise<ProductModel> {
    const product = await this.findProduct.loadPredefinedProduct(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }
}
