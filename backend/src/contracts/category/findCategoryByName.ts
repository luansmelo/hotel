import { CategoryModel } from "./createCategory";

export interface FindCategoryByNameContract {
  findByName(id: string): Promise<CategoryModel | null>;
}
