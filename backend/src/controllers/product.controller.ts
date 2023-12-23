import { ProductServiceContract } from "../utils/contracts/products-contract";
import {
  AddInputToProduct,
  ProductInput,
  ProductInputRemove,
  UpdatedProductInfo,
} from "../dto/product.dto";

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
    return this.service.addInputToProduct(input);
  }

  async updatePredefinedProduct(id: string, updatedInfo: UpdatedProductInfo) {
    return this.service.updatePredefinedProduct(id, updatedInfo);
  }

  async removeInputFromProduct(input: ProductInputRemove): Promise<void> {
    return this.service.removeInputFromProduct(input);
  }
}
