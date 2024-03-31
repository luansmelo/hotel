
import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";
import { UpdateCategoryRepository } from "@/data/protocols/db/category/UpdateCategoryRepository.protocol";
import { CategoryModel } from "@/domain/models/Category";
import { UpdateCategoryUseCaseContract } from "@/domain/usecases/category/UpdateCategory";
import { CategoryNotFoundError } from "@/presentation/errors/CategoryNotFoundError";

export class UpdateCategoryUseCase implements UpdateCategoryUseCaseContract {
  constructor(
    private readonly updateCategory: UpdateCategoryRepository,
    private readonly findCategory: LoadCategoryByIdRepository
  ) { }

  async updateById(
    id: string,
    input: Partial<CategoryModel>
  ) {
    const category = await this.findCategory.loadById(id);

    if (!category) {
      throw new CategoryNotFoundError();
    }

    return this.updateCategory.updateById(category.id, { name: input.name });
  }
}
