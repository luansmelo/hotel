import { CategoryModel } from "./createCategory";

export interface FindCategoryByNameContract {
  findByName(id: string): Promise<CategoryModel | null>;
}

export interface FindCategoryByName {
  findByName(id: string): Promise<CategoryModel | null>;
}