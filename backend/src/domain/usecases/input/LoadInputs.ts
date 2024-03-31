import { FindInputsParams, FindInputsResponse } from "./FindInputsParams";

export interface LoadInputsUseCaseContract {
  loadAll(params: FindInputsParams): Promise<FindInputsResponse | null>;
}