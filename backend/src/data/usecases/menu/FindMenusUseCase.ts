import { LoadMenusRepository } from "@/data/protocols/db/menu/LoadMenusRepository.protocol";
import { MenuModel } from "@/domain/models/Menu";
import { LoadMenusUseCaseContract } from "@/domain/usecases/menu/LoadMenus";

export class FindMenusUseCase implements LoadMenusUseCaseContract {
  constructor(private readonly findMenu: LoadMenusRepository) {}

  async loadAll(): Promise<MenuModel[]> {
    const menu = await this.findMenu.loadAll();

    return menu;
  }
}
