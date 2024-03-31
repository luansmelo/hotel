import prisma from "@/config/prisma";

import { FindMenuController } from "@/presentation/controllers/menu/FindMenuController";
import { MenuRepository } from "@/infra/db/mysql/MenuRepository";
import { FindMenuUseCase } from "@/data/usecases/menu/FindMenuUseCase.ts";

export function makeFindMenuController(): FindMenuController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenuUseCase(repo);

  return new FindMenuController(menu);
}
