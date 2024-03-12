import {
  CategoryModel,
  FindCategoryByIdContract,
  UpdateCategoryContract,
} from "@/contracts";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class UpdateCategoryUseCase {
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
      throw new NotFoundError("Categoria não encontrada");
    }

    return this.updateCategory.updateById(category.id, { name: input.name });
  }
}
