import { ProductModel } from "@/contracts/product";
import {
  FindPredefinedProductById,
  FindPredefinedProductByIdContract,
} from "@/contracts/product/FindPredefinedProductByIdContract";
import { ProductNotFoundError } from "@/presentation/errors/ProductNotFoundError";

export class FindPredefinedProductByIdUseCase
  implements FindPredefinedProductById
{
  constructor(
    private readonly findProduct: FindPredefinedProductByIdContract
  ) {}

  async findPredefinedById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.findPredefinedById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return product;
  }
}
