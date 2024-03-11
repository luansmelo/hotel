import {
  FindProductByIdContract,
  UpdateProduct,
  UpdateProductContract,
} from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";

export class UpdateProductByIdUseCase implements UpdateProduct {
  constructor(
    private readonly updateProduct: UpdateProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async updateById(
    id: string,
    input: Partial<CreateProductModel>
  ): Promise<void> {
    const product = await this.findProduct.findById(id);

    await this.updateProduct.updateById(product.id, input);
  }
}
