import {
  ProductToCategoryInput,
  CategoryInput,
  ProductToCategoryContract,
  CategoryContract,
} from "../../dto/category.dto";

export interface CategoryRepositoryContract {
  save(input: CategoryContract): Promise<void>;
  getAll(): Promise<CategoryContract[] | null>;
  getById(id: string): Promise<CategoryContract | null>;
  getProductInCategory(
    input: ProductToCategoryInput
  ): Promise<ProductToCategoryContract | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductToCategoryContract): Promise<void>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
}

export interface CategoryServiceContract {
  create(input: CategoryInput): Promise<void>;
  getById(id: string): Promise<CategoryContract | null>;
  getAll(): Promise<CategoryContract | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductToCategoryInput): Promise<void>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
}
