import { FindCategoriesParams, FindCategoriesResponse } from "./FindCategoriesParams";

export interface LoadCategoriesUseCaseContract {
  loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>;
}