import { CategoryModel, UpdateCategory } from "@/contracts/category";

export class UpdateCategoryController {
  constructor(private readonly updateCategory: UpdateCategory) {}

  async updateById(id: string, input: Partial<CategoryModel>) {
    return this.updateCategory.updateById(id, input);
  }
}
