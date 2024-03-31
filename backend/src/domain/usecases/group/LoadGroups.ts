import { FindGroupsParams, FindGroupsResponse } from "@/entities/group/FindGroupsParams";

export interface LoadGroupsUseCaseContract {
  findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>;
}