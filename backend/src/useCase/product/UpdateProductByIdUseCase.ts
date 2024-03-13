import {
  FindProductByIdContract,
  UpdateProduct,
  UpdateProductContract,
} from "@/contracts/product";

import { UpdateProductModel } from "@/entities/product/updateProduct";
import { ProductNotFoundError } from "@/utils/errors/ProductNotFoundError";

export class UpdateProductByIdUseCase implements UpdateProduct {
  constructor(
    private readonly updateProduct: UpdateProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async updateById(id: string, input: UpdateProductModel): Promise<void> {
    const product = await this.findProduct.findById(id);
    
    if (!product) {
      throw new ProductNotFoundError();
    }

    await this.updateProduct.updateById(product.id, input);
  }
}
