import { RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";

export interface DeleteInputToProductRepository {
  deleteProduct(input: RemoveInputToProductModel): Promise<Partial<{ count: number }>>
}