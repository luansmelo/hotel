import { DeleteCategoryRepository } from "@/data/protocols/db/category/DeleteCategoryRepository.protocol.ts";
import { DeleteCategoryUseCaseContract } from "@/domain/usecases/category/DeleteCategory";
import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";
import { CategoryModel } from "@/domain/models/Category";
import { CategoryNotFoundError } from "@/presentation/errors/CategoryNotFoundError";

export class DeleteCategoryUseCase implements DeleteCategoryUseCaseContract {
  constructor(
    private readonly deleteCategory: DeleteCategoryRepository,
    private readonly findCategory: LoadCategoryByIdRepository
  ) {}

  async deleteById(id: string): Promise<CategoryModel> {
    const category = await this.findCategory.loadById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return this.deleteCategory.deleteById(category.id);
  }
}
