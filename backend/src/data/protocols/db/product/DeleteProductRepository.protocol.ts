import { ProductModel } from "@/domain/models/Product";

export interface DeleteProductRepository {
  deleteById(id: string): Promise<ProductModel>;
}