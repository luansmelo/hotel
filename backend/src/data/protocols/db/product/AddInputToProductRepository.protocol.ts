import { AddInputToProductModel } from "@/domain/usecases/product/AddInputToProduct";

export interface AddInputToProductRepository {
  addInput(input: AddInputToProductModel): Promise<Partial<{ count: number }>>
}