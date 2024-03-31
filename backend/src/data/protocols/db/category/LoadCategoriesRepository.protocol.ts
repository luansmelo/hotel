import { FindCategoriesParams, FindCategoriesResponse } from "@/domain/usecases/category/FindCategoriesParams";

export interface LoadCategoriesRepository {
    loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>
}