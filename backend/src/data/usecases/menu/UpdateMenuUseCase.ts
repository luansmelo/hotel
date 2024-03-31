import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { UpdateMenuRepository } from "@/data/protocols/db/menu/UpdateMenuRepository.protocol";
import { MenuModel } from "@/domain/models/Menu";
import { CreateMenuModel } from "@/domain/usecases/menu/CreateMenu";
import { UpdateMenuUseCaseContract } from "@/domain/usecases/menu/UpdateMenu";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";

export class UpdateMenuUseCase implements UpdateMenuUseCaseContract {
  constructor(
    private readonly updateMenu: UpdateMenuRepository,
    private readonly findMenu: LoadMenuByIdRepository
  ) { }

  async updateById(id: string, input: Partial<CreateMenuModel>): Promise<Partial<MenuModel>> {
    const menu = await this.findMenu.loadById(id);

    if (!menu) {
      throw new MenuNotFoundError()
    }

    return this.updateMenu.updateById(menu.id, { name: input.name });
  }
}
