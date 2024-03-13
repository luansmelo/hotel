import {
  AddInputToProduct,
  AddInputToProductContract,
} from "@/contracts/product";
import { FindPredefinedProductByIdContract } from "@/contracts/product/FindPredefinedProductByIdContract";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { InputAlreadyExistsError } from "@/utils/errors/InputAlreadyExistsError";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class AddInputToProductUseCase implements AddInputToProduct {
  constructor(
    private readonly input: AddInputToProductContract,
    private readonly findProduct: FindPredefinedProductByIdContract
  ) {}

  async addInput(productModel: AddInputToProductModel): Promise<void> {
    const product = await this.findProduct.findPredefinedById(productModel.id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const existingInputIds = new Set(product.inputs.map((input) => input.id));
    const uniqueInputs = productModel.inputs.filter(
      (input) => !existingInputIds.has(input.id)
    );

    if (!uniqueInputs.length) {
      throw new InputAlreadyExistsError(
        "Todos os insumos já estão inclusos no produto"
      );
    }

    await this.input.add({
      id: productModel.id,
      inputs: uniqueInputs,
    });
  }
}
