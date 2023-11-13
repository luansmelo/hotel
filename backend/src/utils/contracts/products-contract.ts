import {
  AddInputToProduct,
  AddInputToProductData,
  ProductContract,
  ProductRegister,
} from "../../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductContract): Promise<void>;
  getById(id: string): Promise<ProductContract | null>;
  getByName(name: string): Promise<ProductContract | null>;
  getAll(): Promise<ProductContract[] | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductData): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}

export interface ProductServiceContract {
  create(input: ProductRegister): Promise<void>;
  getById(id: string): Promise<ProductContract | null>;
  getByName(name: string): Promise<ProductContract | null>;
  getAll(): Promise<ProductContract[] | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProduct): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}
