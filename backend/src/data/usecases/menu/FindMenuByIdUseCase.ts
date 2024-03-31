import { MenuModel } from "@/contracts/menu/CreateMenuContract";
import {
  FindMenuById,
  FindMenuByIdContract,
} from "@/contracts/menu/FindMenuByIdContract";

export class FindMenuByIdUseCase implements FindMenuById {
  constructor(private readonly findMenu: FindMenuByIdContract) {}

  async findById(id: string): Promise<MenuModel> {
    const menu = await this.findMenu.findById(id);

    return menu;
  }
}
