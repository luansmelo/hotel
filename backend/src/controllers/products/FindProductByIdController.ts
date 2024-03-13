import { FindProductById, ProductModel } from "@/contracts/product";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class FindProductByIdController {
  constructor(private readonly product: FindProductById) {}

  async findById(id: string): Promise<ProductModel | null> {
    const product = await this.product.findById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }
}
