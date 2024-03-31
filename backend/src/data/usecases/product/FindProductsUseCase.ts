import {
  FindProducts,
  FindProductsContract,
  ProductModel,
} from "@/contracts/product";

export class FindProductsUseCase implements FindProducts {
  constructor(private readonly findProduct: FindProductsContract) {}

  async findAll(): Promise<ProductModel[]> {
    const products = await this.findProduct.findAll();

    return products;
  }
}
