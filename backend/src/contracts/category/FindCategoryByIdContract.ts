import { CategoryModel } from "./CreateCategoryContract";

export interface FindCategoryByIdContract {
  findById(id: string): Promise<CategoryModel | null>;
}

export interface FindCategoryById {
  findById(id: string): Promise<CategoryModel | null>;
}
