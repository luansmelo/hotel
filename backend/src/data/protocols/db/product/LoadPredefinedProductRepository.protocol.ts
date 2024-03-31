import { ProductModel } from "@/domain/models/Product";

export interface LoadPredefinedProductRepository {
  loadPredefinedProduct(id: string): Promise<ProductModel | null>;
}