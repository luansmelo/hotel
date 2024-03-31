
import { AddProductToMenuController } from "@/presentation/controllers/menu/AddProductToMenuController";
import { AddProductToMenuUseCase } from "@/data/usecases/menu/AddProductToMenuUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeAddProductToMenuController(): AddProductToMenuController {
  const repo = new MenuRepository();

  const addProduct = new AddProductToMenuUseCase(repo, repo);

  return new AddProductToMenuController(addProduct);
}
