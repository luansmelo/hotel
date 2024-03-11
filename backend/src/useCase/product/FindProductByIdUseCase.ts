import {
  FindProductById,
  FindProductByIdContract,
  ProductModel,
} from "@/contracts/product";

export class FindProductByIdUseCase implements FindProductById {
  constructor(private readonly findProduct: FindProductByIdContract) {}

  async findById(id: string): Promise<ProductModel> {
    return this.findProduct.findById(id);
  }
}
