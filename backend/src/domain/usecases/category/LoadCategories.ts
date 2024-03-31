import { FindCategoriesParams, FindCategoriesResponse } from "@/entities/category/FindCategoriesParams";

export interface LoadCategoriesUseCaseContract {
  loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>;
}