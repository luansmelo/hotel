import { CategoryModel } from "./createCategory";

export interface FindCategoriesContract {
  findAll(): Promise<CategoryModel[] | null>;
}

export interface FindCategories {
  findAll(): Promise<CategoryModel[] | null>;
}
