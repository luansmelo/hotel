import { ProductDTO, AddInputToProductDTO } from "../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductDTO): Promise<void>;
  getById(id: string): Promise<any>;
  getByName(name: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductDTO): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}

export interface ProductServiceContract {
  create(input: ProductDTO): Promise<void>;
  getById(id: string): Promise<any>;
  getByName(name: string): Promise<any>;
  getAll(): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductDTO): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
}
