import {
  AddInputToProduct,
  AddInputToProductData,
  ProductModel,
  ProductInputRemove,
} from "@/dto/product/product.dto";
import { File } from "@/storage/s3/file";

export interface ProductRepositoryContract {
  save(input: ProductModel): Promise<void>;
  getById(id: string): Promise<ProductModel | null>;
  getByName(name: string): Promise<ProductModel | null>;
  getAll(): Promise<any | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductData): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
  updateProductPhoto(
    id: string,
    file: File
  ): Promise<Partial<ProductModel> | null>;
  updateById(id: string, input: Partial<ProductModel>): Promise<void>;
  removeInputFromProduct(input: ProductInputRemove): Promise<void>;
}

export interface ProductServiceContract {
  create(input: ProductModel): Promise<void>;
  getById(id: string): Promise<ProductModel | null>;
  getByName(name: string): Promise<ProductModel | null>;
  getAll(): Promise<ProductModel[] | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProduct): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
  updateProductPhoto(
    id: string,
    file: File
  ): Promise<Partial<ProductModel> | null>;
  updateById(id: string, input: Partial<ProductModel>): Promise<void>;
  removeInputFromProduct(input: ProductInputRemove): Promise<void>;
}
