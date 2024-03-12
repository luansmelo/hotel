import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import { FindMenu } from "@/contracts/menu/FindMenuContract";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";

export class FindMenuController {
  constructor(private readonly menu: FindMenu) {}

  async findMenu(param: FindMenuModel): Promise<MenuModel[] | null> {
    return this.menu.findMenu(param);
  }
}
