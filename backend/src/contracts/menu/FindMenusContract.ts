import { MenuModel } from "./CreateMenuContract";

export interface FindMenusContract {
  findAll(): Promise<MenuModel[] | null>;
}

export interface FindMenus {
  findAll(): Promise<MenuModel[] | null>;
}
