import { AddProductToMenuRepository } from "@/data/protocols/db/menu/AddProductToMenuRepository.protocol";
import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { AddProductModel, AddProductToMenuUseCaseContract } from "@/domain/usecases/menu/AddProductToMenu";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";

export class AddProductToMenuUseCase implements AddProductToMenuUseCaseContract {
  constructor(
    private readonly menuSave: AddProductToMenuRepository,
    private readonly menu: LoadMenuByIdRepository
  ) { }

  async addProduct(menuModel: AddProductModel): Promise<Partial<{ count: number }>> {
    const menu = await this.menu.loadById(menuModel.menuId);

    if (!menu) {
      throw new MenuNotFoundError();
    }

    const products = menuModel.products.flatMap(({ productId, weekDays }) =>
      weekDays.map((day) => ({
        menuId: menuModel.menuId,
        categoryId: menuModel.categoryId,
        productId,
        weekDay: day,
      }))
    );

    return this.menuSave.addProduct(products);
  }
}
