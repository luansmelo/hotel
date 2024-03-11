import { FindProductById, ProductModel } from "@/contracts/product";

export class FindProductByIdController {
  constructor(private readonly product: FindProductById) {}

  async findById(id: string): Promise<ProductModel | null> {
    return this.product.findById(id);
  }
}
