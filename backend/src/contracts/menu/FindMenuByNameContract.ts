import { MenuModel } from "./CreateMenuContract";

export interface FindMenuByNameContract {
  findByName(name: string): Promise<MenuModel | null>;
}

export interface FindMenuByName {
  findByName(name: string): Promise<MenuModel | null>;
}
