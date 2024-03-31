import { CategoryModel } from "@/domain/models/Category";

export interface LoadCategoryByNameUseCaseContract {
  loadByName(name: string): Promise<CategoryModel | null>;
}