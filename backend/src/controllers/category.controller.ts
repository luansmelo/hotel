import { CategoryServiceContract } from "../contracts/category-contract";
import { ProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";

export class CategoryController {
  constructor(private readonly categoryService: CategoryServiceContract) {}

  async create(input: CategoryDTO) {
    return this.categoryService.create(input);
  }

  async addProductToCategory(input: ProductToCategoryDTO) {
    return this.categoryService.addProductToCategory(input);
  }

  async deleteProduct(input: ProductToCategoryDTO) {
    return this.categoryService.deleteProduct(input);
  }

  async getById(id: string) {
    return this.categoryService.getById(id);
  }
}
