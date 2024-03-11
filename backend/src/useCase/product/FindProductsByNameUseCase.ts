import {
  FindProducts,
  FindProductsContract,
  ProductModel,
} from "@/contracts/product";

export class FindProductsByNameUseCase implements FindProducts {
  constructor(private readonly findProduct: FindProductsContract) {}

  async findAll(): Promise<ProductModel[]> {
    return this.findProduct.findAll();
  }
}
