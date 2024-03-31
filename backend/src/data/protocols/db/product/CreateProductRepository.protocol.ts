import { ProductModel } from "@/domain/models/Product";
import { CreateProductModel } from "@/domain/usecases/product/CreateProduct";

export interface CreateProductRepository {
    create(input: CreateProductModel): Promise<ProductModel>;
}