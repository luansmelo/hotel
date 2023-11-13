import { CategoryServiceContract } from "../utils/contracts/category-contract";
import { CategoryInput, ProductToCategoryInput } from "../dto/category.dto";

export class CategoryController {
  constructor(private readonly categoryService: CategoryServiceContract) {}

  async create(input: CategoryInput) {
    return this.categoryService.create(input);
  }

  async addProductToCategory(input: ProductToCategoryInput) {
    return this.categoryService.addProductToCategory(input);
  }

  async deleteProduct(input: ProductToCategoryInput) {
    return this.categoryService.deleteProduct(input);
  }

  async getById(id: string) {
    return this.categoryService.getById(id);
  }
}
