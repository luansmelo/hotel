import { LoadCategoriesRepository } from "@/data/protocols/db/category/LoadCategoriesRepository.protocol";
import { LoadCategoriesUseCaseContract } from "@/domain/usecases/category/LoadCategories";
import { FindCategoriesParams, FindCategoriesResponse } from "@/entities/category/FindCategoriesParams";

export class LoadCategoriesUseCase implements LoadCategoriesUseCaseContract {
  constructor(private readonly findCategories: LoadCategoriesRepository) {}

  async loadAll(
    params: FindCategoriesParams
  ): Promise<FindCategoriesResponse | null> {
    return this.findCategories.loadAll(params);
  }
}
