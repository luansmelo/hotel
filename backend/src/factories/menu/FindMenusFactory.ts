import prisma from "@/config/prisma";
import { FindMenusController } from "@/controllers/menu/FindMenusController";
import { MenuRepository } from "@/repositories/MenuRepository";
import { FindMenusUseCase } from "@/useCase/menu/FindMenusUseCase";

export function makeFindMenusController(): FindMenusController {
  const repo = new MenuRepository(prisma);

  const menu = new FindMenusUseCase(repo);

  return new FindMenusController(menu);
}
