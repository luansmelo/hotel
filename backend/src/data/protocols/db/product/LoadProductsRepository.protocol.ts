import { FindProductsParams, FindProductsResponse } from "@/domain/usecases/product/FindProductsParams";

export interface LoadProductsRepository {
  loadAll(params: FindProductsParams): Promise<FindProductsResponse>;
}