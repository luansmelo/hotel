import { CreateProduct } from "@/contracts/product";
import { CreateProductModel } from "@/entities/product/createProduct";

export class CreateProductController {
  constructor(private readonly product: CreateProduct) {}

  async create(input: CreateProductModel) {
    return this.product.create(input);
  }
}
