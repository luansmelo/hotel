import { FindMeasuresParams, FindMeasuresResponse } from "./FindMeasuresParams";

export interface LoadMeasuresUseCaseContract {
  loadAll(params: FindMeasuresParams): Promise<FindMeasuresResponse>
}