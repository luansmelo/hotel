import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import {
  DeleteMenu,
  DeleteMenuContract,
} from "@/contracts/menu/DeleteMenuContract";
import { FindMenuByIdContract } from "@/contracts/menu/FindMenuByIdContract";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";

export class DeleteMenuUseCase implements DeleteMenu {
  constructor(
    private readonly deleteMenu: DeleteMenuContract,
    private readonly menu: FindMenuByIdContract
  ) {}

  async deleteById(id: string): Promise<MenuModel> {
    const menu = await this.menu.findById(id);

    if (!menu) {
      throw new MenuNotFoundError();
    }

    return this.deleteMenu.deleteById(menu.id);
  }
}
