import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { MenuModel } from "./CreateMenuContract";

export interface UpdateMenuContract {
  updateById(id: string, input: Partial<CreateMenuModel>): Promise<Partial<MenuModel>>;
}

export interface UpdateMenu {
  updateById(id: string, input: Partial<CreateMenuModel>): Promise<Partial<MenuModel>>;
}
