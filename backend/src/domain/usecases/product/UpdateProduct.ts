import { ProductModel } from "@/domain/models/Product";
import { InputToProduct } from "./AddInputToProduct";
import { CreateProductModel } from "./CreateProduct";

export interface UpdateProductModel extends Partial<CreateProductModel> {
    inputs: InputToProduct[];
}

export interface UpdateProductUseCaseContract {
    updateById(id: string, data: Partial<UpdateProductModel>): Promise<Partial<ProductModel>>
}