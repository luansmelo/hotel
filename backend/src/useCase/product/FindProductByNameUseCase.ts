import {
  FindProductByName,
  FindProductByNameContract,
  ProductModel,
} from "@/contracts/product";

export class FindProductByNameUseCase implements FindProductByName {
  constructor(private readonly findProduct: FindProductByNameContract) {}

  async findByName(id: string): Promise<ProductModel> {
    return this.findProduct.findByName(id);
  }
}
