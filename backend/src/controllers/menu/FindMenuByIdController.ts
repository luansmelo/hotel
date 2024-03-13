import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import { FindMenuById } from "@/contracts/menu/FindMenuByIdContract";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";

export class FindMenuByIdController {
  constructor(private readonly menu: FindMenuById) {}

  async findById(id: string): Promise<MenuModel | null> {
    const menu = await this.menu.findById(id);

    if (!menu) {
      throw new MenuNotFoundError()
    }

    return menu;
  }
}
