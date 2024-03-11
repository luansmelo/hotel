import { DeleteInputToProduct } from "@/contracts/product";
import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";

export class DeleteInputToProductController {
  constructor(private readonly product: DeleteInputToProduct) {}

  async deleteById(param: RemoveInputToProductModel) {
    return this.product.deleteInputToProductById(param);
  }
}
