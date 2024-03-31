import { CreateMenuController } from "@/presentation/controllers/menu/CreateMenuController";
import { CreateMenuUseCase } from "@/data/usecases/menu/CreateMenuUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeCreateMenuController(): CreateMenuController {
  const repo = new MenuRepository();

  const createMenu = new CreateMenuUseCase(repo, repo);

  return new CreateMenuController(createMenu);
}
