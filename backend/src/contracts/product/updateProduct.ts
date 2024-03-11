import { CreateProductModel } from "@/entities/product/createProduct";

export interface UpdateProductContract {
  updateById(id: string, input: Partial<CreateProductModel>): Promise<void>;
}

export interface UpdateProduct {
  updateById(id: string, input: Partial<CreateProductModel>): Promise<void>;
}
