import { AddProductToCategoryDTO, CategoryDTO } from "../dto/category.dto";

export interface CategoryRepositoryContract {
  save(input: CategoryDTO): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: AddProductToCategoryDTO): Promise<void>;
}

export interface CategoryServiceContract {
  create(input: CategoryDTO): Promise<void>;
  getById(id: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: AddProductToCategoryDTO): Promise<void>;
}
