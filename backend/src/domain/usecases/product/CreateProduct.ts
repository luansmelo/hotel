import { ProductModel } from "@/domain/models/Product";

export interface CreateProductModel {
    name: string;
    description: string;
    preparationTime: string;
    resource: string;
    accession: number;
    photo_url?: string;
}

export interface CreateProductUseCaseContract {
    create(input: CreateProductModel): Promise<ProductModel>
}