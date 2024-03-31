import { MenuModel } from "@/domain/models/Menu";

export interface FindMenuModel {
  menuId: string;
  categoryId: string;
  day: string;
}

export interface LoadMenuUseCaseContract {
  loadMenu(param: FindMenuModel): Promise<MenuModel | null>;
}