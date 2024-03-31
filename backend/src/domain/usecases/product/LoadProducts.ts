import { ProductModel } from "@/domain/models/Product";

export interface LoadProductsUseCaseContract {
  loadAll(): Promise<ProductModel[] | null>;
}