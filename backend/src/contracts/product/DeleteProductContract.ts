import { ProductModel } from "./CreateProductContract";

export interface DeleteProductContract {
  deleteById(id: string): Promise<ProductModel>;
}

export interface DeleteProduct {
  deleteById(id: string): Promise<ProductModel>;
}
