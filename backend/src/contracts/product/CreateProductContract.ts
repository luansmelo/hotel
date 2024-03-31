import { InputModel } from "@/domain/models/Input";
import { CreateProductModel } from "@/entities/product/createProduct";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
  grammage?: number;
  resource: string;
  photo_url?: string;
  inputs?: InputModel[];
}

export interface CreateProductContract {
  save(input: CreateProductModel): Promise<ProductModel>;
}

export interface CreateProduct {
  create(input: CreateProductModel): Promise<ProductModel>;
}
