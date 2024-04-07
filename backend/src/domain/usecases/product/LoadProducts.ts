import { FindProductsParams, FindProductsResponse } from "./FindProductsParams";

export interface LoadProductsUseCaseContract {
  loadAll(params: FindProductsParams): Promise<FindProductsResponse>;
}