import {
  ProductToCategoryInput,
  CategoryInput,
  ProductToCategoryContract,
  CategoryContract,
  ProductCategoryInput,
  ProductCategoryContract,
} from "../../dto/category.dto";

export interface CategoryRepositoryContract {
  save(input: CategoryContract): Promise<void>;
  getAll(): Promise<CategoryContract[] | null>;
  getById(id: string): Promise<CategoryContract | null>;
  getProductInCategory(
    input: ProductToCategoryInput
  ): Promise<ProductToCategoryContract | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductCategoryContract[]): Promise<void>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
  updateById(id: string, input: CategoryInput): Promise<void>
}

export interface CategoryServiceContract {
  create(input: CategoryInput): Promise<void>;
  getById(id: string): Promise<CategoryContract | null>;
  getAll(): Promise<CategoryContract | null>;
  deleteById(id: string): Promise<void>;
  addProductToCategory(input: ProductCategoryInput): Promise<void>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
  updateById(id: string, input: CategoryInput): Promise<void>
}
