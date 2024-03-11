import { CreateProductModel } from "@/entities/product/createProduct";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
  resource: string;
  photo_url?: string;
}

export interface CreateProductContract {
  save(input: CreateProductModel): Promise<ProductModel>;
}

export interface CreateProduct {
  create(input: CreateProductModel): Promise<ProductModel>;
}
