import { MenuModel } from "./CreateMenuContract";

export interface FindMenuByIdContract {
  findById(id: string): Promise<MenuModel | null>;
}

export interface FindMenuById {
  findById(id: string): Promise<MenuModel | null>;
}
