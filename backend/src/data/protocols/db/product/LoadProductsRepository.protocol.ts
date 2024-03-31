import { ProductModel } from "@/domain/models/Product";

export interface LoadProductsRepository {
  loadAll(): Promise<ProductModel[] | null>;
}