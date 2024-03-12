import {
  AddProductToMenu,
  AddProductToMenuContract,
} from "@/contracts/menu/AddProductToMenuContract";
import { FindMenuById } from "@/contracts/menu/FindMenuByIdContract";
import { AddProductModel } from "@/entities/menu/AddProductToMenuEntity";
import { NotFoundError } from "@/utils/errors/httpErrors";

export class AddProductToMenuUseCase implements AddProductToMenu {
  constructor(
    private readonly menuSave: AddProductToMenuContract,
    private readonly menu: FindMenuById
  ) {}

  async addProduct(menuModel: AddProductModel): Promise<void> {
    const menu = await this.menu.findById(menuModel.menuId);

    if (!menu) {
      throw new NotFoundError("Cardápio não encontrado");
    }

    const products = menuModel.product.flatMap(({ productId, weekDay }) =>
      weekDay.map((day) => ({
        menuId: menuModel.menuId,
        categoryId: menuModel.categoryId,
        productId,
        weekDay: day,
      }))
    );

    await this.menuSave.add(products);
  }
}
