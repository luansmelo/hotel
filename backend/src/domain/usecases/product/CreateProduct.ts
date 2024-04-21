import { ProductModel, Status } from "@/domain/models/Product";

export interface CreateProductModel {
    name: string;
    description: string;
    preparationTime: string;
    resource: string;
    accession: number;
    status?: string
    photo_url?: string;
}

export interface CreateProductUseCaseContract {
    create(input: CreateProductModel): Promise<ProductModel>
}