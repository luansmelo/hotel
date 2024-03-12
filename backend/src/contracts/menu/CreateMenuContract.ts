import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";

export interface MenuModel {
  id?: string;
  name: string;
}

export interface CreateMenuContract {
  save(input: CreateMenuModel): Promise<MenuModel>;
}

export interface CreateMenu {
  create(input: CreateMenuModel): Promise<MenuModel>;
}
