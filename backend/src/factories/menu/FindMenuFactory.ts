import prisma from "@/config/prisma";

import { FindMenuController } from "@/controllers/menu/FindMenuController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { FindMenuUseCase } from "@/useCase/menu/FindMenuUseCase.ts";

export function makeFindMenuController(): FindMenuController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenuUseCase(repo);

  return new FindMenuController(menu);
}
