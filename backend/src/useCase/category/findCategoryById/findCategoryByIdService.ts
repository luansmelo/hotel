import { CategoryModel, FindCategoryByIdContract } from "@/contracts";

export class FindCategoryById {
  constructor(private readonly findCategories: FindCategoryByIdContract) {}

  async findById(id: string): Promise<CategoryModel> {
    return this.findCategories.findById(id);
  }
}
