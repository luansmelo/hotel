import { FindMenuController } from "@/presentation/controllers/menu/FindMenuController";
import { FindMenuUseCase } from "@/data/usecases/menu/FindMenuUseCase.ts";
import { MenuRepository } from "@/infra/db/mysql/menu/MenuRepository";

export function makeFindMenuController(): FindMenuController {
  const repo = new MenuRepository();

  const menu = new FindMenuUseCase(repo);

  return new FindMenuController(menu);
}
