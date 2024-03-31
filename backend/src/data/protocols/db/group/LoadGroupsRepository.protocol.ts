import { FindGroupsParams, FindGroupsResponse } from "@/domain/usecases/group/FindGroupsParams";

export interface LoadGroupsRepository {
    loadAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>
}