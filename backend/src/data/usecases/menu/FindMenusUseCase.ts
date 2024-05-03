import { LoadMenusRepository } from "@/data/protocols/db/menu/LoadMenusRepository.protocol";
import { FindMenuParams, FindMenuResponse } from "@/domain/usecases/menu/FindMenuParams";
import { LoadMenusUseCaseContract } from "@/domain/usecases/menu/LoadMenus";

export class FindMenusUseCase implements LoadMenusUseCaseContract {
  constructor(private readonly findMenu: LoadMenusRepository) {}

  async loadAll(findParams: FindMenuParams): Promise<FindMenuResponse> {
    const menu = await this.findMenu.loadAll(findParams);

    return menu;
  }
}
