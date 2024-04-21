import { DeleteInputToProductRepository } from "@/data/protocols/db/product/DeleteInputToProductRepository.protocol";
import { LoadProductByIdRepository } from "@/data/protocols/db/product/LoadProductByIdRepository.protocol";
import { UpdateProductRepository } from "@/data/protocols/db/product/UpdateProductRepository.protocol";
import { DeleteInputToProductUseCaseContract, RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class DeleteInputToProductUseCase implements DeleteInputToProductUseCaseContract {
  constructor(
    private readonly removeInput: DeleteInputToProductRepository,
    private readonly findProduct: LoadProductByIdRepository,
    private readonly updateProduct: UpdateProductRepository
  ) { }

  async deleteProduct(
    productModel: RemoveInputToProductModel
  ) {
    const product = await this.findProduct.loadById(productModel.productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const removeProduct = await this.removeInput.deleteProduct(productModel);

    if (removeProduct?.count && product.inputs.length - removeProduct.count === 0) {
      await this.updateProduct.updateById(product.id, { status: 'INCOMPLETE' });
    }

    return removeProduct;
  }
}
