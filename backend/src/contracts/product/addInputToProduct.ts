import { ProductModel } from "./createProduct";
import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

export interface AddInputToProductContract {
  add(input: AddInputToProductModel): Promise<ProductModel>;
}

export interface AddInputToCreateProduct {
  save(input: AddInputToProductModel): Promise<ProductModel>;
}
