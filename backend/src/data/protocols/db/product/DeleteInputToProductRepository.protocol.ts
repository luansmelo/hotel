import { RemoveInputToProductModel } from "@/domain/usecases/product/DeleteInputToProduct";

export interface DeleteInputToProductRepository {
  deleteProduct(product: RemoveInputToProductModel): Promise<Partial<{ count: number }>>
}