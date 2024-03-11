import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

export interface AddInputToProductContract {
  add(input: AddInputToProductModel): Promise<void>;
}

export interface AddInputToProduct {
  addInput(input: AddInputToProductModel): Promise<void>;
}
