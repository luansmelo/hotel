import { ProductModel } from "@/contracts/product";
import { FindPredefinedProductById } from "@/contracts/product/findPredefinedProductById";

export class FindPredefinedProductByIdController {
  constructor(private readonly product: FindPredefinedProductById) {}

  async findPredefinedById(id: string): Promise<ProductModel | null> {
    return this.product.findPredefinedById(id);
  }
}
