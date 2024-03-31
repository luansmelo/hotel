import { DeleteInputToProductRepository } from "@/data/protocols/db/product/DeleteInputToProductRepository.protocol";
import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { DeleteInputToProductUseCaseContract, RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class DeleteInputToProductUseCase implements DeleteInputToProductUseCaseContract {
  constructor(
    private readonly removeInput: DeleteInputToProductRepository,
    private readonly findProduct: LoadProductByIdRepository
  ) { }

  async deleteProduct(
    productModel: RemoveInputToProductModel
  ) {
    const product = await this.findProduct.loadById(productModel.productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const inputToProduct = new Set(product.inputs.map((input) => input.id));

    if (!inputToProduct.has(productModel.inputId)) {
      throw new InputNotFoundError();
    }

    return this.removeInput.deleteProduct(productModel);
  }
}
