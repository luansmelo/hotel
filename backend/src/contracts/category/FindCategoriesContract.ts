import {
  FindCategoriesParams,
  FindCategoriesResponse,
} from "@/entities/category/FindCategoriesParams";

export interface FindCategoriesContract {
  findAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>;
}

export interface FindCategories {
  findAll(params: FindCategoriesParams): Promise<FindCategoriesResponse | null>;
}
