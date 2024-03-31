import { FindMenusController } from "@/presentation/controllers/menu/FindMenusController";
import { FindMenusUseCase } from "@/data/usecases/menu/FindMenusUseCase";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeFindMenusController(): FindMenusController {
  const repo = new MenuRepository();

  const menu = new FindMenusUseCase(repo);

  return new FindMenusController(menu);
}
