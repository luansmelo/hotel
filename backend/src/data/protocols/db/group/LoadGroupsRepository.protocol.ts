import { FindGroupsParams, FindGroupsResponse } from "@/entities/group/FindGroupsParams";

export interface LoadGroupsRepository {
    loadAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>
}