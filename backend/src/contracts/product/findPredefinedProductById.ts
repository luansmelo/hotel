import { ProductModel } from "./createProduct";

export interface FindPredefinedProductByIdContract {
  findById(id: string): Promise<ProductModel | null>;
}

export interface FindPredefinedProductById {
  findById(id: string): Promise<ProductModel | null>;
}
