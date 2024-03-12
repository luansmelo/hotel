import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import { FindMenus } from "@/contracts/menu/FindMenusContract";

export class FindMenusController {
  constructor(private readonly menus: FindMenus) {}

  async findAll(): Promise<MenuModel[] | null> {
    return this.menus.findAll();
  }
}
