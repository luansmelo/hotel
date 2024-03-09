import { CategoryModel, FindCategoryByNameContract } from "@/contracts";

export class FindCategoryByName {
  constructor(private readonly findCategories: FindCategoryByNameContract) {}

  async findByName(name: string): Promise<CategoryModel> {
    return this.findCategories.findByName(name);
  }
}
