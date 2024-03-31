import { ProductModel } from "@/domain/models/Product";

export interface CreateProductModel {
    name: string;
    description: string;
    preparationTime: number;
    resource: string;
    photo_url?: string;
}

export interface CreateProductUseCaseContract {
    create(input: CreateProductModel): Promise<ProductModel>
}