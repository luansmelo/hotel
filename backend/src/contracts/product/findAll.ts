import { ProductModel } from "./createProduct";

export interface FindProductsContract {
  findAll(): Promise<ProductModel[] | null>;
}

export interface FindProducts {
  findAll(): Promise<ProductModel[] | null>;
}
