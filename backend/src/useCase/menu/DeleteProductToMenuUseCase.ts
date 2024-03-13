import {
  DeleteProductToMenu,
  DeleteProductToMenuContract,
} from "@/contracts/menu/DeleteProductToMenuContract";
import { FindMenuByIdContract } from "@/contracts/menu/FindMenuByIdContract";
import { RemoveProductModel } from "@/entities/menu/RemoveProductToMenuEntity";
import { MenuNotFoundError } from "@/utils/errors/MenuNotFoundError";

export class DeleteProductToMenuUseCase implements DeleteProductToMenu {
  constructor(
    private readonly removeProduct: DeleteProductToMenuContract,
    private readonly menu: FindMenuByIdContract
  ) {}

  async deleteProduct(param: RemoveProductModel): Promise<void> {
    const menu = await this.menu.findById(param.menuId);

    if (!menu) {
      throw new MenuNotFoundError()
    }

    await this.removeProduct.deleteProduct(param);
  }
}
