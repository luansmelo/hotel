import { DeleteProductRepository } from "@/data/protocols/db/product/DeleteProductRepository.protocol";
import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { DeleteProductUseCaseContract } from "@/domain/usecases/product/DeleteProduct";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";
import { ProductModel } from "@/domain/models/Product";

export class DeleteProductUseCase implements DeleteProductUseCaseContract {
  constructor(
    private readonly deleteProduct: DeleteProductRepository,
    private readonly findProduct: LoadProductByIdRepository
  ) {}

  async deleteById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.loadById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return this.deleteProduct.deleteById(id);
  }
}
