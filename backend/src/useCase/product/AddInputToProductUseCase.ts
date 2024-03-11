import { FindInputsById } from "@/contracts/input/FindInputsById";
import {
  AddInputToProduct,
  AddInputToProductContract,
} from "@/contracts/product";
import { FindPredefinedProductByIdContract } from "@/contracts/product/findPredefinedProductById";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class AddInputToProductUseCase implements AddInputToProduct {
  constructor(
    private readonly input: AddInputToProductContract,
    private readonly findProduct: FindPredefinedProductByIdContract
  ) {}

  async addInput(productModel: AddInputToProductModel): Promise<void> {
    const product = await this.findProduct.findPredefinedById(productModel.id);

    if (!product) throw new NotFoundError("Produto não encontrado");

    await this.input.add(productModel);
  }
}
