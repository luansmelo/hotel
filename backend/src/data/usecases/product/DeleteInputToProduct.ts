import {
  DeleteInputToProduct,
  DeleteInputToProductContract,
  FindProductByIdContract,
} from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { InputNotFoundError } from "@/presentation/errors/InputNotFoundError";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class DeleteInputToProductUseCase implements DeleteInputToProduct {
  constructor(
    private readonly removeInput: DeleteInputToProductContract,
    private readonly findProduct: FindProductByIdContract
  ) { }

  async deleteInputToProductById(
    productModel: RemoveInputToProductModel
  ): Promise<Partial<{ count: number }>> {
    const product = await this.findProduct.findById(productModel.productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const inputToProduct = new Set(product.inputs.map((input) => input.id));

    if (!inputToProduct.has(productModel.inputId)) {
      throw new InputNotFoundError();
    }

    return this.removeInput.deleteInputToProductById(productModel);
  }
}
