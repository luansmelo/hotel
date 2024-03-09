import { CategoryModel } from "./createCategory";

export interface UpdateCategoryContract {
  updateById(id: string, input: Partial<CategoryModel>): Promise<CategoryModel>;
}

export interface UpdateCategory {
  updateById(id: string, input: Partial<CategoryModel>): Promise<CategoryModel>;
}
