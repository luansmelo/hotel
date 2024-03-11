import { FindProductById, ProductModel } from "@/contracts/product";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class FindProductByIdController {
  constructor(private readonly product: FindProductById) {}

  async findById(id: string): Promise<ProductModel | null> {
    const product = await this.product.findById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    return product;
  }
}
