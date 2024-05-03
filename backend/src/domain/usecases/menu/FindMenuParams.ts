import { MenuModel } from "@/domain/models/Menu";

export type Sort = "name" | "createdAt" | "updatedAt";

export interface FindMenuParams {
  page?: number;
  sort?: Sort;
  order?: 'asc' | 'desc';
}

export interface FindMenuResponse {
  menus: Partial<MenuModel>[];
  totalPages: number;
  totalItems: number;
}
