import { ProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";

export interface CategoryRepositoryContract {
  save(input: CategoryDTO): Promise<void>;
  getAll(): Promise<any | null>;
  getById(id: string): Promise<any | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductToCategoryDTO): Promise<void>;
  deleteProduct(input: ProductToCategoryDTO): Promise<void>;
}

export interface CategoryServiceContract {
  create(input: CategoryDTO): Promise<void>;
  getById(id: string): Promise<any | null>;
  getAll(): Promise<any | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductToCategoryDTO): Promise<void>;
  deleteProduct(input: ProductToCategoryDTO): Promise<void>;
}
