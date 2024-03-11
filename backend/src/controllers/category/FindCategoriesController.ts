import { CategoryModel, FindCategories } from "@/contracts/category";

export class FindCategoriesController {
  constructor(private readonly categories: FindCategories) {}

  async findAll(): Promise<CategoryModel[] | null> {
    return this.categories.findAll();
  }
}
