import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { MenuModel } from "./CreateMenuContract";

export interface FindMenuContract {
  findMenu(param: FindMenuModel): Promise<MenuModel[] | null>;
}

export interface FindMenu {
  findMenu(param: FindMenuModel): Promise<MenuModel[] | null>;
}
