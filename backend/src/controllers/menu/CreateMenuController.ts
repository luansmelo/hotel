import { CreateMenu } from "@/contracts/menu/CreateMenuContract";
import { CreateMenuModel } from "@/entities/menu/CreateMenuEntity";

export class CreateMenuController {
  constructor(private readonly menu: CreateMenu) {}

  async create(input: CreateMenuModel) {
    return this.menu.create(input);
  }
}
