import { LoadCategoryByIdRepository } from "@/data/protocols/db/category/LoadCategoryByIdRepository.protocol";
import { CategoryModel } from "@/domain/models/Category";
import { LoadCategoryByIdUseCaseContract } from "@/domain/usecases/category/LoadCategoryById";

export class LoadCategoryByIdUseCase implements LoadCategoryByIdUseCaseContract {
  constructor(private readonly loadCategory: LoadCategoryByIdRepository) { }

  async loadById(id: string): Promise<CategoryModel> {
    return this.loadCategory.loadById(id);
  }
}
