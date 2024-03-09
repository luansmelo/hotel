import { CategoryModel, FindCategoriesContract } from "@/contracts";

export class FindCategoriesUseCase {
  constructor(private readonly findCategories: FindCategoriesContract) {}

  async findAll(): Promise<CategoryModel[] | null> {
    return this.findCategories.findAll();
  }
}
