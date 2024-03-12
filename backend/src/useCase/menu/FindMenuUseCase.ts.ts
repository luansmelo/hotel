import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import { FindMenu, FindMenuContract } from "@/contracts/menu/FindMenuContract";
import { FindMenuModel } from "@/entities/menu/FindMenuEntity";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class FindMenuUseCase implements FindMenu {
  constructor(private readonly menu: FindMenuContract) {}

  async findMenu(param: FindMenuModel): Promise<MenuModel> {
    const menu = await this.menu.findMenu(param);

    if (!menu) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    return menu;
  }
}
