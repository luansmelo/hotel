import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { MenuModel } from "@/domain/models/Menu";
import { LoadMenuByIdUseCaseContract } from "@/domain/usecases/menu/LoadMenuById";

export class FindMenuByIdUseCase implements LoadMenuByIdUseCaseContract {
  constructor(private readonly findMenu: LoadMenuByIdRepository) {}

  async loadById(id: string): Promise<MenuModel> {
    const menu = await this.findMenu.loadById(id);

    return menu;
  }
}
