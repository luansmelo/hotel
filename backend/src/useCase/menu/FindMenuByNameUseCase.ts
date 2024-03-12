import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import {
  FindMenuByName,
  FindMenuByNameContract,
} from "@/contracts/menu/FindMenuByNameContract";

export class FindMenuByNameUseCase implements FindMenuByName {
  constructor(private readonly findMenu: FindMenuByNameContract) {}

  async findByName(name: string): Promise<MenuModel> {
    const menu = await this.findMenu.findByName(name);

    return menu;
  }
}
