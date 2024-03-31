import { DeleteMenuRepository } from "@/data/protocols/db/menu/DeleteMenuRepository.protocol.ts";
import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { MenuModel } from "@/domain/models/Menu";
import { DeleteMenuUseCaseContract } from "@/domain/usecases/menu/DeleteMenu";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";

export class DeleteMenuUseCase implements DeleteMenuUseCaseContract {
  constructor(
    private readonly deleteMenu: DeleteMenuRepository,
    private readonly menu: LoadMenuByIdRepository
  ) {}

  async deleteById(id: string): Promise<MenuModel> {
    const menu = await this.menu.loadById(id);

    if (!menu) {
      throw new MenuNotFoundError();
    }

    return this.deleteMenu.deleteById(menu.id);
  }
}
