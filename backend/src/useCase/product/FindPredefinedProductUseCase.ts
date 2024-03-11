import { ProductModel } from "@/contracts/product";
import {
  FindPredefinedProductById,
  FindPredefinedProductByIdContract,
} from "@/contracts/product/findPredefinedProductById";
import { NotFoundError } from "@/utils/errors/httpErrors";

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

    const processedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      preparationTime: product.preparationTime,
      resource: product.resource,
      inputs: product.inputs.map((e) => ({
        id: e.id,
        name: e.name,
        code: e.code,
        measurementUnit: e.measurementUnit,
        unitPrice: e.unitPrice,
        groups: e.groups,
        grammage: e.grammage,
      })),
    };

    return processedProduct;
  }
}
