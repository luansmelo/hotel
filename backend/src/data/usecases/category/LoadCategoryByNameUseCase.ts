import { LoadCategoryByNameRepository } from "@/data/protocols/db/category/LoadCategoryByNameRepository.protocol.ts";
import { CategoryModel } from "@/domain/models/Category";
import { LoadCategoryByNameUseCaseContract } from "@/domain/usecases/category/LoadCategoryByName";

export class FindCategoryByNameUseCase implements LoadCategoryByNameUseCaseContract {
  constructor(private readonly findCategories: LoadCategoryByNameRepository) {}

  async loadByName(name: string): Promise<CategoryModel> {
    return this.findCategories.loadByName(name);
  }
}
