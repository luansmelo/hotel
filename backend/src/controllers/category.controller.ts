import { CategoryServiceContract } from "../contracts/category-contract";
import { AddProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";

export class CategoryController {
  constructor(private readonly categoryService: CategoryServiceContract) {}

  async create(input: CategoryDTO) {
    return this.categoryService.create(input);
  }

  async addProductToCategory(input: AddProductToCategoryDTO) {
    return this.categoryService.addProductToCategory(input);
  }
}
