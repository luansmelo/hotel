import { UpdateMenu } from "@/contracts/menu/UpdateMenuContract";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";

export class UpdateMenuController {
  constructor(private readonly menu: UpdateMenu) {}

  async updateById(id: string, input: Partial<CreateMenuModel>) {
    return this.menu.updateById(id, input);
  }
}
