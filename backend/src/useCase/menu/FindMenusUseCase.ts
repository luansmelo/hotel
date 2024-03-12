import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import {
  FindMenus,
  FindMenusContract,
} from "@/contracts/menu/FindMenusContract";

export class FindMenusUseCase implements FindMenus {
  constructor(private readonly findMenu: FindMenusContract) {}

  async findAll(): Promise<MenuModel[]> {
    const menu = await this.findMenu.findAll();

    return menu;
  }
}
