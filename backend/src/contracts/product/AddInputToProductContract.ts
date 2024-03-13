import { AddInputToProductModel } from "@/entities/product/addInputToProduct";

export interface AddInputToProductContract {
  add(input: AddInputToProductModel): Promise<Partial<{ count: number }>>;
}

export interface AddInputToProduct {
  addInput(input: AddInputToProductModel): Promise<Partial<{ count: number }>>;
}
