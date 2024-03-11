import {
  DeleteProduct,
  DeleteProductContract,
  FindProductByIdContract,
  ProductModel,
} from "@/contracts/product";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteProductUseCase implements DeleteProduct {
  constructor(
    private readonly deleteProduct: DeleteProductContract,
    private readonly findProduct: FindProductByIdContract
  ) {}

  async deleteById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.findById(id);

    if (!product) {
      throw new NotFoundError("Produto não encontrado");
    }

    return this.deleteProduct.deleteById(id);
  }
}
