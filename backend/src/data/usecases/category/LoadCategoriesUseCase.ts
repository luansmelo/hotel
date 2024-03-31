import { LoadCategoriesRepository } from "@/data/protocols/db/category/LoadCategoriesRepository.protocol";
import { FindCategoriesParams, FindCategoriesResponse } from "@/domain/usecases/category/FindCategoriesParams";
import { LoadCategoriesUseCaseContract } from "@/domain/usecases/category/LoadCategories";

export class LoadCategoriesUseCase implements LoadCategoriesUseCaseContract {
  constructor(private readonly findCategories: LoadCategoriesRepository) {}

  async loadAll(
    params: FindCategoriesParams
  ): Promise<FindCategoriesResponse | null> {
    return this.findCategories.loadAll(params);
  }
}
