import { ProductModel } from "./CreateProductContract";

export interface FindProductByIdContract {
  findById(id: string): Promise<ProductModel | null>;
}

export interface FindProductById {
  findById(id: string): Promise<ProductModel | null>;
}
