import { DeleteMenuController } from "@/presentation/controllers/menu/DeleteProductController";
import { DeleteMenuUseCase } from "@/data/usecases/menu/DeleteMenuUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeDeleteMenuController(): DeleteMenuController {
  const repo = new MenuRepository();

  const deleteMenu = new DeleteMenuUseCase(repo, repo);

  return new DeleteMenuController(deleteMenu);
}
