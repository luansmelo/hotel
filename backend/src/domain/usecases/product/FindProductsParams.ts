import { ProductModel } from "@/domain/models/Product";

export type Sort = "name" | "description" | "accession" | "status" | "resource" | "createdAt" | "updatedAt";

export interface FindProductsParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindProductsResponse {
  products: Partial<ProductModel>[];
  totalPages: number;
  totalItems: number;
}
