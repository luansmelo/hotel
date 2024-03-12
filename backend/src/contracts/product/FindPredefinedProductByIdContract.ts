import { ProductModel } from "./CreateProductContract";

export interface FindPredefinedProductByIdContract {
  findPredefinedById(id: string): Promise<ProductModel | null>;
}

export interface FindPredefinedProductById {
  findPredefinedById(id: string): Promise<ProductModel | null>;
}
