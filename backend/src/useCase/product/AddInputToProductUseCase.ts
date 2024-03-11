import {
  AddInputToProduct,
  AddInputToProductContract,
  FindProductByIdContract,
  ProductModel,
} from "@/contracts/product";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { UnauthorizedError } from "@/utils/errors/httpErrors";

export class AddInputToProductUseCase implements AddInputToProduct {
  constructor(
    private readonly addInput: AddInputToProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async save(productModel: AddInputToProductModel): Promise<ProductModel> {
    const product = await this.findProduct.findById(productModel.id);

    const inputIdsToAdd = productModel.input.map((i) => i.id);
    const inputOnProduct = product.inputs.some((input) =>
      inputIdsToAdd.includes(input.id)
    );

    if (inputOnProduct)
      throw new UnauthorizedError("Input já foi adicionado ao produto");

    return this.addInput.add(productModel);
  }
}
