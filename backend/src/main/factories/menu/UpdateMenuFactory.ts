import { UpdateMenuController } from "@/presentation/controllers/menu/UpdateMenuController";
import { FindMenuByIdUseCase } from "@/data/usecases/menu/FindMenuByIdUseCase";
import { UpdateMenuUseCase } from "@/data/usecases/menu/UpdateMenuUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeUpdateMenuController(): UpdateMenuController {
  const repo = new MenuRepository();

  const findMenuById = new FindMenuByIdUseCase(repo);

  const updateMenu = new UpdateMenuUseCase(repo, findMenuById);

  return new UpdateMenuController(updateMenu);
}
