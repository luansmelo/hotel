import { ProductModel } from "@/domain/models/Product";
import { UpdateProductModel } from "@/domain/usecases/product/UpdateProduct";

export interface UpdateProductRepository {
    updateById(id: string, data: Partial<UpdateProductModel>): Promise<Partial<ProductModel>>
}