import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { MenuModel } from "./CreateMenuContract";

export interface FindMenusContract {
  findMenu(param: FindMenuModel): Promise<MenuModel[] | null>;
}

export interface FindMenus {
  findMenu(param: FindMenuModel): Promise<MenuModel[] | null>;
}
