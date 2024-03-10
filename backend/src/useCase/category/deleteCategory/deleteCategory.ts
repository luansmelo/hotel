import {
  CategoryModel,
  DeleteCategory,
  DeleteCategoryContract,
  FindCategoryByIdContract,
} from "@/contracts";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class DeleteCategoryUseCase implements DeleteCategory {
  constructor(
    private readonly deleteCategory: DeleteCategoryContract,
    private readonly findCategory: FindCategoryByIdContract
  ) {}

  async deleteById(id: string): Promise<CategoryModel> {
    const category = await this.findCategory.findById(id);

    if (!category) {
      throw new NotFoundError("Categoria não encontrada");
    }

    return this.deleteCategory.deleteById(category.id);
  }
}
