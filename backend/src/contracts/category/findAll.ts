import { CategoryModel } from "./createCategory";

export interface FindCategoriesContract {
  findAll(): Promise<CategoryModel[] | null>;
}
