import { ProductModel } from "./CreateProductContract";

export interface FindProductsContract {
  findAll(): Promise<ProductModel[] | null>;
}

export interface FindProducts {
  findAll(): Promise<ProductModel[] | null>;
}
