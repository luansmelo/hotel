import { MenuModel } from "./CreateMenuContract";

export interface DeleteMenuContract {
  deleteById(id: string): Promise<MenuModel>;
}

export interface DeleteMenu {
  deleteById(id: string): Promise<MenuModel>;
}
