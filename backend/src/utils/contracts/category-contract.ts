import {
  Category,
  ProductToCategoryContract,
} from "@/dto/category/category.dto";

export interface CategoryRepositoryContract {
  save(input: Category): Promise<void>;
  getAll(): Promise<Category[] | null>;
  getById(id: string): Promise<Category | null>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, input: Partial<Category>): Promise<void>;
}

export interface CategoryServiceContract {
  create(input: Category): Promise<void>;
  getById(id: string): Promise<Category | null>;
  getAll(): Promise<Category | null>;
  deleteById(id: string): Promise<void>;
  updateById(id: string, input: Partial<Category>): Promise<void>;
}
