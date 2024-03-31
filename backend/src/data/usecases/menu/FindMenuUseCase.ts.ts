import { LoadMenuRepository } from "@/data/protocols/db/menu/LoadMenuRepository";
import { MenuModel } from "@/domain/models/Menu";
import { FindMenuModel, LoadMenuUseCaseContract } from "@/domain/usecases/menu/LoadMenu";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";

export class FindMenuUseCase implements LoadMenuUseCaseContract {
  constructor(private readonly menu: LoadMenuRepository) {}

  async loadMenu(param: FindMenuModel): Promise<MenuModel> {
    const menu = await this.menu.loadMenu(param);

    if (!menu) {
      throw new MenuNotFoundError();
    }

    return menu;
  }
}
