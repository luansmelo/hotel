import { ProductServiceContract } from "../contracts/products-contract";
import { AddInputToProductDTO, ProductDTO } from "../dto/product.dto";

export class ProductController {
  constructor(private readonly productService: ProductServiceContract) {}

  async create(input: ProductDTO) {
    return this.productService.create(input);
  }

  async getById(id: string) {
    return this.productService.getById(id);
  }

  async getByName(name: string) {
    return this.productService.getByName(name);
  }

  async getAll() {
    return this.productService.getAll();
  }

  async deleteById(id: string) {
    return this.productService.deleteById(id);
  }

  async getPredefinedProduct(id: string) {
    return this.productService.getPredefinedProduct(id);
  }

  async addInputToProduct(input: AddInputToProductDTO): Promise<void> {
    return this.productService.addInputToProduct(input);
  }
}
