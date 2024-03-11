import { ProductModel } from "./createProduct";

export interface FindPredefinedProductByIdContract {
  findPredefinedById(id: string): Promise<ProductModel | null>;
}

export interface FindPredefinedProductById {
  findPredefinedById(id: string): Promise<ProductModel | null>;
}
