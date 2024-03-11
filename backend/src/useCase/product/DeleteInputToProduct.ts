import {
  DeleteInputToProduct,
  DeleteInputToProductContract,
  FindProductByIdContract,
} from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteInputToProductUseCase implements DeleteInputToProduct {
  constructor(
    private readonly removeInput: DeleteInputToProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async deleteInputToProductById(
    productModel: RemoveInputToProductModel
  ): Promise<void> {
    const product = await this.findProduct.findById(productModel.productId);

    const inputToProduct = product.inputs.map(
      (input) => input.id === productModel.inputId
    );

    if (!inputToProduct.length) {
      throw new NotFoundError("Insumo para o prato não encontrado");
    }

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    await this.removeInput.deleteInputToProductById(productModel);
  }
}
