import {
  FindGroupsParams,
  FindGroupsResponse,
} from "@/entities/group/FindGroupsParams";

export interface FindGroupsContract {
  findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>;
}

export interface FindGroups {
  findAll(params: FindGroupsParams): Promise<FindGroupsResponse | null>;
}
