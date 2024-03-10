import {
  CategoryModel,
  FindCategoryById,
  FindCategoryByIdContract,
} from "@/contracts";

export class FindCategoryByIdUseCase implements FindCategoryById {
  constructor(private readonly findCategories: FindCategoryByIdContract) {}

  async findById(id: string): Promise<CategoryModel> {
    return this.findCategories.findById(id);
  }
}
