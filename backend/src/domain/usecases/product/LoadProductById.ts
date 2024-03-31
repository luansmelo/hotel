import { ProductModel } from "@/domain/models/Product";

export interface LoadProductByIdUseCaseContract {
  loadById(id: string): Promise<ProductModel | null>;
}