import { UpdateProduct } from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";

export class UpdateProductController {
  constructor(private readonly product: UpdateProduct) {}

  async updateById(id: string, input: Partial<CreateProductModel>) {
    return this.product.updateById(id, input);
  }
}
