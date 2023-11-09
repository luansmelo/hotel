import { ProductDTO, AddInputToDish } from "../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductDTO): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToDish): Promise<void>;
}

export interface ProductServiceContract {
  create(input: ProductDTO): Promise<void>;
  getAll(): Promise<any>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToDish): Promise<void>;
}
