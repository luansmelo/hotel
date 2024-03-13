import { UpdateProductModel } from "@/entities/product/updateProduct";

export interface UpdateProductContract {
  updateById(id: string, input: Partial<UpdateProductModel>): Promise<Partial<UpdateProductModel>>;
}

export interface UpdateProduct {
  updateById(id: string, input: Partial<UpdateProductModel>): Promise<Partial<UpdateProductModel>>;
}
