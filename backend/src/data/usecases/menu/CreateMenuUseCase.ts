import {
  CreateMenu,
  CreateMenuContract,
  MenuModel,
} from "@/contracts/menu/CreateMenuContract";
import { FindMenuByNameContract } from "@/contracts/menu/FindMenuByNameContract";

import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { MenuAlreadyExistsError } from "@/presentation/errors/MenuAlreadyExistsError";

export class CreateMenuUseCase implements CreateMenu {
  constructor(
    private readonly createMenu: CreateMenuContract,
    private readonly findProduct: FindMenuByNameContract
  ) {}

  async create(menuModel: CreateMenuModel): Promise<MenuModel> {
    const menu = await this.findProduct.findByName(menuModel.name);

    if (menu) {
      throw new MenuAlreadyExistsError("Cardápio já criado");
    }

    return this.createMenu.save(menuModel);
  }
}
