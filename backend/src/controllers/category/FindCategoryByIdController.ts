import { CategoryModel, FindCategoryById } from "@/contracts/category";

export class FindCategoryByIdController {
  constructor(private readonly category: FindCategoryById) {}

  async findById(id: string): Promise<CategoryModel | null> {
    return this.category.findById(id);
  }
}
