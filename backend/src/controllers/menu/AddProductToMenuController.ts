import { AddProductToMenu } from "@/contracts/menu/AddProductToMenuContract";
import { AddProductModel } from "@/entities/menu/AddProductToMenuEntity";

export class AddProductToMenuController {
  constructor(private readonly menu: AddProductToMenu) {}

  async add(input: AddProductModel) {
    return this.menu.addInput(input);
  }
}
