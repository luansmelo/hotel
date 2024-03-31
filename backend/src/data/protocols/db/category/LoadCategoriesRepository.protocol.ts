import { FindCategoriesParams, FindCategoriesResponse } from "@/entities/category/FindCategoriesParams";

export interface LoadCategoriesRepository {
    loadAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>
}