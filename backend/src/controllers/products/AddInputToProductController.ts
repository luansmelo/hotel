import { AddInputToProduct, CreateProduct } from "@/contracts/product";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

export class AddInputToProductController {
  constructor(private readonly product: AddInputToProduct) {}

  async add(input: AddInputToProductModel) {
    return this.product.addInput(input);
  }
}
