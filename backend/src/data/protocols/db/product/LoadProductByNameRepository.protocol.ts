import { ProductModel } from "@/domain/models/Product";

export interface LoadProductByNameRepository {
  loadByName(name: string): Promise<ProductModel | null>;
}