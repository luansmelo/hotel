import { ProductModel } from "@/domain/models/Product";

export interface LoadProductByNameUseCaseContract {
  loadById(name: string): Promise<ProductModel | null>;
}