import {
  DeleteInputToProduct,
  DeleteInputToProductContract,
  FindProductByIdContract,
} from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { InputNotFoundError } from "@/utils/errors/InputNotFoundError";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class DeleteInputToProductUseCase implements DeleteInputToProduct {
  constructor(
    private readonly removeInput: DeleteInputToProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async deleteInputToProductById(
    productModel: RemoveInputToProductModel
  ): Promise<void> {
    const product = await this.findProduct.findById(productModel.productId);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const inputToProduct = new Set(product.inputs.map((input) => input.id));

    if (!inputToProduct.has(productModel.inputId)) {
      throw new InputNotFoundError();
    }

    await this.removeInput.deleteInputToProductById(productModel);
  }
}
