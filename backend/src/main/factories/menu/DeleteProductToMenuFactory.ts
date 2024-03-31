import { DeleteProductToMenuController } from "@/presentation/controllers/menu/DeleteProductToMenuController";
import { DeleteProductToMenuUseCase } from "@/data/usecases/menu/DeleteProductToMenuUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeDeleteProductToMenuController(): DeleteProductToMenuController {
  const repo = new MenuRepository();

  const deleteProductToMenu = new DeleteProductToMenuUseCase(repo, repo);

  return new DeleteProductToMenuController(deleteProductToMenu);
}
