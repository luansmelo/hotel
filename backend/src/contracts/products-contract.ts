import { ProductDTO, AddInputToDish } from "../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductDTO): Promise<void>;
  getAll(): Promise<any>;
  addInputToProduct(input: AddInputToDish): Promise<void>;
}

export interface ProductServiceContract {
  create(input: ProductDTO): Promise<void>;
  getAll(): Promise<any>;
  addInputToProduct(input: AddInputToDish): Promise<void>;
}
