import { UpdateProductModel } from "@/entities/product/updateProduct";

export interface UpdateProductContract {
  updateById(id: string, input: Partial<UpdateProductModel>): Promise<void>;
}

export interface UpdateProduct {
  updateById(id: string, input: Partial<UpdateProductModel>): Promise<void>;
}
