import { GroupModel } from "@/domain/models/Group";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindGroupsParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindGroupsResponse {
  groups: Partial<GroupModel>[];
  totalPages: number;
  totalItems: number;
}
