import { CategoryDTO } from "../dto/categoria.dto";
import { CategoryService } from "../services/categoria.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  async createCategory(payload: CategoryDTO) {
    return this.categoryService.createCategory(payload);
  }

  async getCategory() {
    return this.categoryService.getCategory();
  }
}
