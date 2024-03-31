import { ProductModel } from "@/domain/models/Product";

export interface LoadPredefinedProductUseCaseContract {
  loadPredefinedProduct(id: string): Promise<ProductModel | null>;
}