import {
  CategoryModel,
  FindCategories,
  FindCategoriesContract,
} from "@/contracts";

export class FindCategoriesUseCase implements FindCategories {
  constructor(private readonly findCategories: FindCategoriesContract) {}

  async findAll(): Promise<CategoryModel[] | null> {
    return this.findCategories.findAll();
  }
}
