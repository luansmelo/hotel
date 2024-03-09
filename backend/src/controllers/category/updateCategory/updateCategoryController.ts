import { CategoryModel, UpdateCategory } from "@/contracts/category";

export class UpdateCategoryController {
  constructor(private readonly deleteCategory: UpdateCategory) {}

  async updateById(id: string, input: Partial<CategoryModel>) {
    return this.deleteCategory.updateById(id, input);
  }
}
