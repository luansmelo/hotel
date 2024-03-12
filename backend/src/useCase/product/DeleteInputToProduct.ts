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

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    const inputToProduct = new Set(product.inputs.map((input) => input.id));

    if (!inputToProduct.has(productModel.inputId)) {
      throw new NotFoundError("Insumo para o prato não encontrado");
    }

    await this.removeInput.deleteInputToProductById(productModel);
  }
}
