import { UserModel } from "@/domain/models/User";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindUsersParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindUsersResponse {
  users: Partial<UserModel>[];
  totalPages: number;
  totalItems: number;
}
