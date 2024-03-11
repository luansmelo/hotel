import { FindProducts, ProductModel } from "@/contracts/product";

export class FindProductController {
  constructor(private readonly products: FindProducts) {}

  async findAll(): Promise<ProductModel[] | null> {
    return this.products.findAll();
  }
}
