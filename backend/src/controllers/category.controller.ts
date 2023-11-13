import { CategoryServiceContract } from "../utils/contracts/category-contract";
import { CategoryInput, ProductToCategoryInput } from "../dto/category.dto";

export class CategoryController {
  constructor(private readonly service: CategoryServiceContract) {}

  async create(input: CategoryInput) {
    return this.service.create(input);
  }

  async addProductToCategory(input: ProductToCategoryInput) {
    return this.service.addProductToCategory(input);
  }

  async deleteProduct(input: ProductToCategoryInput) {
    return this.service.deleteProduct(input);
  }

  async getById(id: string) {
    return this.service.getById(id);
  }
}
