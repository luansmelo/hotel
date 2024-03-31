import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { UpdateProductRepository } from "@/data/protocols/db/product/UpdateProductRepository.protocol";
import { UpdateProductModel, UpdateProductUseCaseContract } from "@/domain/usecases/product/UpdateProduct";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class UpdateProductByIdUseCase implements UpdateProductUseCaseContract {
  constructor(
    private readonly updateProduct: UpdateProductRepository,
    private readonly findProduct: LoadProductByIdRepository
  ) { }

  async updateById(id: string, input: UpdateProductModel) {
    const product = await this.findProduct.loadById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return this.updateProduct.updateById(product.id, input);
  }
}
