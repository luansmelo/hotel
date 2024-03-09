import { CategoryModel, FindCategoryByNameContract } from "@/contracts";

export class FindCategoryByNameUseCase {
  constructor(private readonly findCategories: FindCategoryByNameContract) {}

  async findByName(name: string): Promise<CategoryModel> {
    return this.findCategories.findByName(name);
  }
}
