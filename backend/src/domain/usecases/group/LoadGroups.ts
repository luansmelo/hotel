import { FindGroupsParams, FindGroupsResponse } from "./FindGroupsParams";

export interface LoadGroupsUseCaseContract {
  findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>;
}