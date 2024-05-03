import { FindMenuParams, FindMenuResponse } from "./FindMenuParams";

export interface LoadMenusUseCaseContract {
  loadAll(findParams: FindMenuParams): Promise<FindMenuResponse>;
}