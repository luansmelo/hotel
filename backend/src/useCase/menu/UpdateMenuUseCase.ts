import { FindMenuByIdContract } from "@/contracts/menu/FindMenuByIdContract";
import {
  UpdateMenu,
  UpdateMenuContract,
} from "@/contracts/menu/UpdateMenuContract";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class UpdateMenuUseCase implements UpdateMenu {
  constructor(
    private readonly updateMenu: UpdateMenuContract,
    private readonly findMenu: FindMenuByIdContract
  ) {}

  async updateById(id: string, input: Partial<CreateMenuModel>): Promise<void> {
    const menu = await this.findMenu.findById(id);

    if (!menu) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    await this.updateMenu.updateById(menu.id, { name: input.name });
  }
}
