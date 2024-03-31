import { ProductModel } from "@/domain/models/Product";

export interface LoadProductByIdRepository {
  loadById(id: string): Promise<ProductModel | null>;
}