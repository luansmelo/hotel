import {
  AddInputToProduct,
  AddInputToProductData,
  ProductContract,
  ProductInput,
  ProductInputRemove,
  UpdatedProductInfo,
} from "../../dto/product.dto";

export interface ProductRepositoryContract {
  save(input: ProductContract): Promise<void>;
  getById(id: string): Promise<ProductContract | null>;
  getByName(name: string): Promise<ProductContract | null>;
  getAll(): Promise<ProductContract[] | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProductData): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
  updatePredefinedProduct(
    id: string,
    updatedInfo: UpdatedProductInfo
  ): Promise<void>;
  removeInputFromProduct(input: ProductInputRemove): Promise<void>;
}

export interface ProductServiceContract {
  create(input: ProductInput): Promise<void>;
  getById(id: string): Promise<ProductContract | null>;
  getByName(name: string): Promise<ProductContract | null>;
  getAll(): Promise<ProductContract[] | null>;
  deleteById(id: string): Promise<void>;
  addInputToProduct(input: AddInputToProduct): Promise<void>;
  getPredefinedProduct(id: string): Promise<any>;
  updatePredefinedProduct(
    id: string,
    updatedInfo: UpdatedProductInfo
  ): Promise<void>;
  removeInputFromProduct(input: ProductInputRemove): Promise<void>;
}
