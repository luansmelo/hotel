import { ProductServiceContract } from "../utils/contracts/products-contract";
import { AddInputToProduct, ProductRegister } from "../dto/product.dto";

export class ProductController {
  constructor(private readonly repository: ProductServiceContract) {}

  async create(input: ProductRegister) {
    return this.repository.create(input);
  }

  async getById(id: string) {
    return this.repository.getById(id);
  }

  async getByName(name: string) {
    return this.repository.getByName(name);
  }

  async getAll() {
    return this.repository.getAll();
  }

  async deleteById(id: string) {
    return this.repository.deleteById(id);
  }

  async getPredefinedProduct(id: string) {
    return this.repository.getPredefinedProduct(id);
  }

  async addInputToProduct(input: AddInputToProduct): Promise<void> {
    return this.repository.addInputToProduct(input);
  }
}
