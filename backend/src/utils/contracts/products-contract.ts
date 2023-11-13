import {
  AddInputToProduct,
  AddInputToProductData,
  ProductData,
  ProductRegister,
} from "../../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductData): Promise<void>;
  getById(id: string): Promise<any>;
  getByName(name: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductData): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}

export interface ProductServiceContract {
  create(input: ProductRegister): Promise<void>;
  getById(id: string): Promise<any>;
  getByName(name: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProduct): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}
