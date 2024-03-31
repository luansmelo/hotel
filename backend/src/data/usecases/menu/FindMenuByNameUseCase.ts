import { LoadMenuByNameRepository } from "@/data/protocols/db/menu/LoadMenuByNameRepository.protocol.ts";
import { MenuModel } from "@/domain/models/Menu";
import { LoadMenuByNameUseCaseContract } from "@/domain/usecases/menu/LoadMenuByName";

export class FindMenuByNameUseCase implements LoadMenuByNameUseCaseContract {
  constructor(private readonly findMenu: LoadMenuByNameRepository) {}

  async loadByName(name: string): Promise<MenuModel> {
    const menu = await this.findMenu.loadByName(name);

    return menu;
  }
}
