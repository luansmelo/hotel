import { GroupModel } from "@/contracts/group";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindGroupsParams {
  page?: number;
  sort?: Sort;
  order?: 'ASC' | 'DESC';
}

export interface FindGroupsResponse {
  groups: Partial<GroupModel>[];
  totalPages: number;
  totalItems: number;
}
