import { CategoryModel } from "@/contracts";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindCategoriesParams {
  page?: number;
  sort: Sort;
  order?: 'ASC' | 'DESC';
}

export interface FindCategoriesResponse {
  categories: Partial<CategoryModel>[];
  totalPages: number;
  totalItems: number;
}
