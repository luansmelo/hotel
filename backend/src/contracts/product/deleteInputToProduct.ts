import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";
import { ProductModel } from "./createProduct";

export interface DeleteInputToProductContract {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<ProductModel>;
}

export interface DeleteInputToProduct {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<ProductModel>;
}
