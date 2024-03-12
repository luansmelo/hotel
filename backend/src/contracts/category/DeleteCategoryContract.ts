import { CategoryModel } from "./CreateCategoryContract";

export interface DeleteCategoryContract {
  deleteById(id: string): Promise<CategoryModel>;
}

export interface DeleteCategory {
  deleteById(id: string): Promise<CategoryModel>;
}
