import { ProductModel } from "@/contracts/product";
import {
  FindPredefinedProductById,
  FindPredefinedProductByIdContract,
} from "@/contracts/product/FindPredefinedProductByIdContract";
import { NotFoundError } from "@/utils/errors/httpErrors";
import { mapperProduct } from "./mapper/mapperProduct";

export class FindPredefinedProductByIdUseCase
  implements FindPredefinedProductById
{
  constructor(
    private readonly findProduct: FindPredefinedProductByIdContract
  ) {}

  async findPredefinedById(id: string): Promise<ProductModel> {
    const product = await this.findProduct.findPredefinedById(id);

    if (!product) {
      throw new NotFoundError("Nenhum prato predefinido encontrado");
    }

    return product;
  }
}
