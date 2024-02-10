import { ProductCategoryContract, ProductCategoryInput, ProductToCategoryInput } from "../../dto/category.dto";
import { MenuContract, MenuInput, MenuProductInput } from "../../dto/menu.dto";

export interface MenuRepositoryContract {
  save(input: MenuContract): Promise<MenuContract>;
  getById(id: string): Promise<MenuContract | null>;
  getList(day?: string): Promise<any | null>;
  deleteById(id: string): Promise<MenuContract | null>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
  addProduct(input: ProductCategoryContract[]): Promise<void>;
}

export interface MenuServiceContract {
  create(input: MenuInput): Promise<MenuContract>;
  getById(id: string): Promise<MenuContract | null>;
  deleteById(id: string): Promise<MenuContract | null>;
  getAll(day?: string): Promise<any | null>;
  getSelectedMenu(input: MenuProductInput): Promise<any | null>;
  deleteProduct(input: ProductToCategoryInput): Promise<void>;
  addProduct(input: ProductCategoryInput): Promise<void>;
}
