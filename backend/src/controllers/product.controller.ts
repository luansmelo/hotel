import { ProductServiceContract } from "../utils/contracts/products-contract";
import { AddInputToProduct, ProductInput } from "../dto/product.dto";

export class ProductController {
  constructor(private readonly service: ProductServiceContract) {}

  async create(input: ProductInput) {
    return this.service.create(input);
  }

  async getById(id: string) {
    return this.service.getById(id);
  }

  async getByName(name: string) {
    return this.service.getByName(name);
  }

  async getAll() {
    return this.service.getAll();
  }

  async deleteById(id: string) {
    return this.service.deleteById(id);
  }

  async getPredefinedProduct(id: string) {
    return this.service.getPredefinedProduct(id);
  }

  async addInputToProduct(input: AddInputToProduct): Promise<void> {
    console.log("CHEGOU AQUI", input);
    return this.service.addInputToProduct(input);
  }
}
