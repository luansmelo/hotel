import { ProductModel } from "./CreateProductContract";

export interface FindProductByNameContract {
  findByName(name: string): Promise<ProductModel | null>;
}

export interface FindProductByName {
  findByName(name: string): Promise<ProductModel | null>;
}
