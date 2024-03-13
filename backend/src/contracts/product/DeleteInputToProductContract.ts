import { RemoveInputToProductModel } from "@/entities/product/removeInputToProduct";

export interface DeleteInputToProductContract {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<Partial<{ count: number }>>;
}

export interface DeleteInputToProduct {
  deleteInputToProductById(param: RemoveInputToProductModel): Promise<Partial<{ count: number }>>;
}
