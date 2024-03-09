import { CreateCategoryModel } from "@/entities/category/createCategory";

export interface CategoryModel {
  id?: string;
  name: string;
}

export interface CreateCategoryContract {
  save(input: CreateCategoryModel): Promise<CategoryModel>;
}

export interface CreateCategory {
  create(input: CreateCategoryModel): Promise<CategoryModel>;
}
