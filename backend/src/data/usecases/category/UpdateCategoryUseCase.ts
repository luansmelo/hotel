import {
  CategoryModel,
  FindCategoryByIdContract,
  UpdateCategory,
  UpdateCategoryContract,
} from "@/contracts";
import { CategoryNotFoundError } from "@/utils/errors/CategoryNotFoundError";

export class UpdateCategoryUseCase implements UpdateCategory {
  constructor(
    private readonly updateCategory: UpdateCategoryContract,
    private readonly findCategory: FindCategoryByIdContract
  ) {}

  async updateById(
    id: string,
    input: Partial<CategoryModel>
  ): Promise<CategoryModel> {
    const category = await this.findCategory.findById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return this.updateCategory.updateById(category.id, { name: input.name });
  }
}
