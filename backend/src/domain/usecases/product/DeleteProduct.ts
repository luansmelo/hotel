import { ProductModel } from "@/domain/models/Product";

export interface DeleteProductUseCaseContract {
    deleteById(id: string): Promise<ProductModel>;
}
