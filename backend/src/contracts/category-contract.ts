import { ProductDTO, AddInputToProductDTO } from "../dto/product.dto";

export interface CategoryRepositoryContract {
  save(input: ProductDTO): Promise<void>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
}

export interface CategoryServiceContract {
  create(input: ProductDTO): Promise<void>;
  getById(id: string): Promise<any>;
  deleteById(id: string): Promise<void>;
}
