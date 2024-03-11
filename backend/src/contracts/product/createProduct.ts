import { CreateProductModel } from "@/entities/product/createProduct";
import { InputModel } from "../input";

export interface ProductModel {
  id?: string;
  name: string;
  description: string;
  preparationTime: number;
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
