import { DeleteProductToMenu } from "@/contracts/menu/DeleteProductToMenuContract";
import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";

export class DeleteProductToMenuController {
  constructor(private readonly menu: DeleteProductToMenu) {}

  async deleteProduct(param: RemoveProductModel) {
    return this.menu.deleteProduct(param);
  }
}
