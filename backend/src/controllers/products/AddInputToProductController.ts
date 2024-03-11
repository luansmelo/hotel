import { AddInputToProduct, CreateProduct } from "@/contracts/product";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

export class AddInputToProductController {
  constructor(private readonly product: AddInputToProduct) {}

  async create(input: AddInputToProductModel) {
    return this.product.save(input);
  }
}
