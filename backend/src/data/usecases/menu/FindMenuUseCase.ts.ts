import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import { FindMenu, FindMenuContract } from "@/contracts/menu/FindMenuContract";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";

export class FindMenuUseCase implements FindMenu {
  constructor(private readonly menu: FindMenuContract) {}

  async findMenu(param: FindMenuModel): Promise<MenuModel> {
    const menu = await this.menu.findMenu(param);

    if (!menu) {
      throw new MenuNotFoundError();
    }

    return menu;
  }
}
