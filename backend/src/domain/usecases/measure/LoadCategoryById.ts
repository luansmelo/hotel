import { CategoryModel } from "@/domain/models/Category";

export interface LoadCategoryByIdUseCaseContract {
  loadById(id: string): Promise<CategoryModel | null>;
}