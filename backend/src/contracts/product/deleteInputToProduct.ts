import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";

export interface DeleteInputToProductContract {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<void>;
}

export interface DeleteInputToProduct {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<void>;
}
