import {
  CategoryModel,
  FindCategoryByName,
  FindCategoryByNameContract,
} from "@/contracts";

export class FindCategoryByNameUseCase implements FindCategoryByName {
  constructor(private readonly findCategories: FindCategoryByNameContract) {}

  async findByName(name: string): Promise<CategoryModel> {
    return this.findCategories.findByName(name);
  }
}
