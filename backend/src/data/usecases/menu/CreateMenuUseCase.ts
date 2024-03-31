import { CreateMenuRepository } from "@/data/protocols/db/menu/CreateMenuRepository.protocol";
import { LoadMenuByNameRepository } from "@/data/protocols/db/menu/LoadMenuByNameRepository.protocol.ts";
import { MenuModel } from "@/domain/models/Menu";
import { CreateMenuModel, CreateMenuUseCaseContract } from "@/domain/usecases/menu/CreateMenu";
import { MenuAlreadyExistsError } from "@/presentation/errors/MenuAlreadyExistsError";

export class CreateMenuUseCase implements CreateMenuUseCaseContract {
  constructor(
    private readonly createMenu: CreateMenuRepository,
    private readonly findProduct: LoadMenuByNameRepository
  ) {}

  async create(menuModel: CreateMenuModel): Promise<MenuModel> {
    const menu = await this.findProduct.loadByName(menuModel.name);

    if (menu) {
      throw new MenuAlreadyExistsError("Cardápio já criado");
    }

    return this.createMenu.create(menuModel);
  }
}
