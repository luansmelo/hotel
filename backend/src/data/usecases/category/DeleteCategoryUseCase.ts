import {
  CategoryModel,
  DeleteCategory,
  DeleteCategoryContract,
  FindCategoryByIdContract,
} from "@/contracts";
import { CategoryNotFoundError } from "@/presentation/errors/CategoryNotFoundError";

export class DeleteCategoryUseCase implements DeleteCategory {
  constructor(
    private readonly deleteCategory: DeleteCategoryContract,
    private readonly findCategory: FindCategoryByIdContract
  ) {}

  async deleteById(id: string): Promise<CategoryModel> {
    const category = await this.findCategory.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return this.deleteCategory.deleteById(category.id);
  }
}
