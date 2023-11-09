import { ProductServiceContract } from "../contracts/products-contract";
import { AddInputToDish, ProductDTO } from "../dto/product.dto";

export class ProductController {
  constructor(private readonly productService: ProductServiceContract) {}

  async create(input: ProductDTO) {
    return this.productService.create(input);
  }

  async getAll() {
    return this.productService.getAll();
  }

  async getById(id: string) {
    return this.productService.getById(id);
  }

  async deleteById(id: string) {
    return this.productService.deleteById(id);
  }

  async addInputToProduct(input: AddInputToDish): Promise<void> {
    return this.productService.addInputToProduct(input);
  }
}
