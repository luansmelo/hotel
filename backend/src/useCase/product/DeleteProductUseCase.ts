import {
  DeleteProduct,
  DeleteProductContract,
  FindProductByIdContract,
  ProductModel,
} from "@/contracts/product";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class DeleteProductUseCase implements DeleteProduct {
  constructor(
    private readonly deleteProduct: DeleteProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async deleteById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.findById(id);

    if (!product) {
      throw new ProductNotFoundError();
    }

    return this.deleteProduct.deleteById(id);
  }
}
