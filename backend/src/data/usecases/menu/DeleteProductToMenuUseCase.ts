import { DeleteProductToMenuRepository } from "@/data/protocols/db/menu/DeleteProductToMenuRepository.protocol";
import { LoadMenuByIdRepository } from "@/data/protocols/db/menu/LoadMenuByIdRepository.protocol";
import { DeleteProductToMenuUseCaseContract, RemoveProductModel } from "@/domain/usecases/menu/DeleteProductToMenu";
import { MenuNotFoundError } from "@/presentation/errors/MenuNotFoundError";

export class DeleteProductToMenuUseCase implements DeleteProductToMenuUseCaseContract {
  constructor(
    private readonly removeProduct: DeleteProductToMenuRepository,
    private readonly menu: LoadMenuByIdRepository
  ) {}

  async deleteProduct(param: RemoveProductModel): Promise<void> {
    const menu = await this.menu.loadById(param.menuId);

    if (!menu) {
      throw new MenuNotFoundError()
    }

    await this.removeProduct.deleteProduct(param);
  }
}
